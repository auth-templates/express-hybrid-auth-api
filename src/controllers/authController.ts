import { Request, Response } from 'express';
import { hashPassword } from '../lib/password.js';
import { validateSignupData } from '../lib/validation-schemas/signup-schema.js';
import { UserRepository } from '../repositories/users.js';
import { AppError } from '../lib/error.js';
import { Role, UserStatus } from '../models/user.js';
import {
	sendAccountActivationEmail,
	sendPasswordChangedEmail,
	sendPasswordResetEmail,
	sendVerificationEmail,
} from '../lib/mailer.js';
import { createAccessToken, generateToken } from '../lib/token.js';
import { VerificationTokensRepository } from '../repositories/verification-tokens.js';
import { TokenType } from '../models/verification-token.js';
import { validateLoginData } from '../lib/validation-schemas/login-schema.js';
import GlobalConfig from '../config.js';
import { RefreshTokenStore } from '../lib/redis/redis-token.js';
import { validatePassword } from '../lib/validation-schemas/password-schema.js';
import { destroyUserSession, initializeUserSession, setCookieTokens } from '../lib/session.js';
import { authenticator } from 'otplib';
import { createMessageResponse } from '../lib/response.js';
import logger from '@/lib/logger/index.js';
import { validateEmail } from '@/lib/validation-schemas/email-validation-schema.js';
import { AppStatusCode } from '@/@types/status-code.js';

export async function savePasswordResetToken(
	userId: number,
	tokenFingerprint: string,
	hashedToken: string,
	expiresInMinutes: number
): Promise<void> {
	const expiresAt = new Date();
	expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);
	await VerificationTokensRepository.createToken({
		userId: userId,
		tokenHash: hashedToken,
		tokenFingerprint: tokenFingerprint,
		type: TokenType.PasswordReset,
		expiresAt: expiresAt,
	});
}

export async function saveSignupToken(
	userId: number,
	tokenFingerprint: string,
	hashedToken: string,
	expiresInMinutes: number
): Promise<void> {
	const expiresAt = new Date();
	expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);
	await VerificationTokensRepository.createToken({
		userId: userId,
		tokenHash: hashedToken,
		tokenFingerprint: tokenFingerprint,
		type: TokenType.SignUp,
		expiresAt: expiresAt,
	});
}

export const verifySignup = async (request: Request, response: Response): Promise<void> => {
	const { token } = request.body;
	try {
		const { userId } = await VerificationTokensRepository.verifySignupToken(token);
		await UserRepository.updateUserStatus(userId, UserStatus.Active);
		const user = await UserRepository.getUserById(userId);
		await sendAccountActivationEmail({ t: request.t, userEmail: user.email });
		response.status(204).send();
	} catch (error) {
		if (error instanceof AppError) {
			if (error.code === AppStatusCode.USER_NOT_FOUND) {
				// Hide actual user existence to prevent user enumeration; respond with generic activation failure message.
				response
					.status(401)
					.json(
						createMessageResponse(
							request.t('errors.activation_failed_user_not_found'),
							'error',
							AppStatusCode.VERIFICATION_FAILED
						)
					);
			} else {
				response
					.status(error.httpStatusCode)
					.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			}
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
};

export const signup = async (request: Request, response: Response): Promise<void> => {
	try {
		const issues = validateSignupData(request.body);

		if (issues.length > 0) {
			response
				.status(400)
				.json(
					createMessageResponse(
						issues.map(({ message, items }) => request.t(message, items)) as string[],
						'error'
					)
				);
			return;
		}

		const { firstName, lastName, email, password, role, termsAccepted } = request.body;

		const id = await UserRepository.createUser({
			firstName,
			lastName,
			email,
			passwordHash: await hashPassword(password),
			role: role as Role,
			termsAccepted,
		});
		const expiresInMinutes = GlobalConfig.SIGNUP_TOKEN_MAX_AGE / 1000 / 60;
		const { token, tokenFingerprint, hashedToken } = await generateToken();
		await saveSignupToken(id, tokenFingerprint, hashedToken, expiresInMinutes);
		await sendVerificationEmail({ token, userEmail: email, expiresInMinutes, t: request.t });
		response.status(204).send();
	} catch (error) {
		if (error instanceof AppError) {
			if (error.code === AppStatusCode.USER_NOT_FOUND) {
				// Hide actual user existence to prevent user enumeration; respond with generic activation failure message.
				response
					.status(401)
					.json(
						createMessageResponse(
							request.t('errors.activation_failed_user_not_found'),
							'error',
							AppStatusCode.VERIFICATION_FAILED
						)
					);
			} else {
				response
					.status(error.httpStatusCode)
					.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			}
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
};

export async function getSession(request: Request, response: Response): Promise<void> {
	const userId = request.session?.user?.id;

	try {
		const user = await UserRepository.getUserById(userId);
		response.status(200).send({ user });
	} catch (error) {
		if (error instanceof AppError) {
			response
				.status(error.httpStatusCode)
				.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
}

export const login = async (request: Request, response: Response): Promise<void> => {
	const { email, password } = request.body;

	try {
		const issues = validateLoginData({ email, password });

		if (issues.length > 0) {
			response
				.status(400)
				.json(
					createMessageResponse(
						[issues[0]].map(({ message, items }) => request.t(message, items)) as string[],
						'error'
					)
				);
			return;
		}

		const user = await UserRepository.login(email, password);
		await initializeUserSession(request, response, user);

		response.status(200).send(user);
	} catch (error) {
		if (error instanceof AppError) {
			response
				.status(error.httpStatusCode)
				.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
};

export const logout = async (request: Request, response: Response): Promise<void> => {
	const userId = request.session?.user?.id;
	const refreshToken = request.cookies?.refresh_token;
	try {
		await RefreshTokenStore.removeRefreshToken(userId, refreshToken);
		destroyUserSession(request, response);
	} catch (error) {
		if (error instanceof AppError) {
			response
				.status(error.httpStatusCode)
				.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
};

async function issueNewAccessToken(req: Request, res: Response): Promise<void> {
	const refreshToken = req.cookies?.refresh_token;
	const userId = req.session?.user?.id;
	const pending2FA = req.session?.pending2FA;
	const termsAccepted = req.session?.termsAccepted;

	const stored = await RefreshTokenStore.getStoredRefreshToken(userId, refreshToken);

	if (!refreshToken || refreshToken !== stored) {
		throw new AppError('errors.invalid_refresh_token', {}, AppStatusCode.REFRESH_TOKEN_INVALID, 403);
	}

	await RefreshTokenStore.resetRefreshTokenExpiration(userId, refreshToken);

	const newAccessToken = createAccessToken({ userId, pending2FA, termsAccepted });

	setCookieTokens(res, [{ name: 'access_token', value: newAccessToken, maxAge: GlobalConfig.ACCESS_TOKEN_MAX_AGE }]);
}

export const refresh = async (request: Request, response: Response): Promise<void> => {
	try {
		await issueNewAccessToken(request, response);
		response.status(204).end();
	} catch (error) {
		if (error instanceof AppError) {
			response
				.status(error.httpStatusCode)
				.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
};

export const resendActivationEmail = async (request: Request, response: Response): Promise<void> => {
	const { userEmail } = request.body;

	try {
		const issues = validateEmail({ email: userEmail });

		if (issues.length > 0) {
			response
				.status(400)
				.json(
					createMessageResponse(
						issues.map(({ message, items }) => request.t(message, items)) as string[],
						'error'
					)
				);
			return;
		}

		const user = await UserRepository.getUserByEmail(userEmail);

		if (user.status !== UserStatus.Pending) {
			// returning 200 on purpose to avoid revealing sensitive information about the user
			response
				.status(200)
				.json(
					createMessageResponse(
						[request.t('info.confirmation_email_if_needed')],
						'info',
						AppStatusCode.CONFIRMATION_EMAIL_SENT_IF_NEEDED
					)
				);
			return;
		}

		const expiresInMinutes = GlobalConfig.SIGNUP_TOKEN_MAX_AGE / 1000 / 60;
		const { token, tokenFingerprint, hashedToken } = await generateToken();

		await saveSignupToken(user.id, tokenFingerprint, hashedToken, expiresInMinutes);
		await sendVerificationEmail({ token, userEmail, expiresInMinutes, t: request.t });

		response.status(204).send();
	} catch (error) {
		if (error instanceof AppError) {
			if (error.code === AppStatusCode.USER_NOT_FOUND) {
				// Hide actual user existence to prevent user enumeration; respond with generic activation failure message.
				response
					.status(401)
					.json(
						createMessageResponse(
							request.t('errors.email_verification_send_failed'),
							'error',
							AppStatusCode.EMAIL_VERIFICATION_SEND_FAILED
						)
					);
			} else {
				response
					.status(error.httpStatusCode)
					.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			}
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
};

export const resetPassword = async (request: Request, response: Response): Promise<void> => {
	const { userEmail } = request.body;

	try {
		const issues = validateEmail({ email: userEmail });

		if (issues.length > 0) {
			response
				.status(400)
				.json(
					createMessageResponse(
						issues.map(({ message, items }) => request.t(message, items)) as string[],
						'error'
					)
				);
			return;
		}

		const user = await UserRepository.getUserByEmail(userEmail);

		if (user.status !== UserStatus.Active) {
			// 200 is on purpose because this This prevents attackers from confirming whether a user exists or is locked out.
			throw new AppError(
				'errors.password_reset_not_initiated',
				{},
				AppStatusCode.PASSWORD_RESET_NOT_INITIATED,
				200
			);
		}

		const { token, tokenFingerprint, hashedToken } = await generateToken();
		const expiresInMinutes = GlobalConfig.PASSWORD_RESET_TOKEN_MAX_AGE / 1000 / 60;
		await savePasswordResetToken(user.id, tokenFingerprint, hashedToken, expiresInMinutes);
		await sendPasswordResetEmail({ token, userEmail, expiresInMinutes, t: request.t });
		response.status(204).end();
	} catch (error) {
		if (error instanceof AppError) {
			if (error.code === AppStatusCode.USER_NOT_FOUND) {
				// Hide actual user existence to prevent user enumeration; respond with generic activation failure message.
				response
					.status(401)
					.json(
						createMessageResponse(
							request.t('errors.email_password_reset_send_failed'),
							'error',
							AppStatusCode.EMAIL_PASSWORD_RESET_SEND_FAILED
						)
					);
			} else {
				response
					.status(error.httpStatusCode)
					.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			}
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
};

export const confirmResetPassword = async (request: Request, response: Response): Promise<void> => {
	const { password, token } = request.body;

	try {
		const issues = validatePassword(password);

		if (issues.length > 0) {
			response
				.status(400)
				.json(
					createMessageResponse(
						[issues[0]].map(({ message, items }) => request.t(message, items)) as string[],
						'error'
					)
				);
			return;
		}

		const { userId } = await VerificationTokensRepository.verifyPasswordResetToken(token);
		const user = await UserRepository.getUserById(userId);

		if (user.status !== UserStatus.Active) {
			// 200 is on purpose because this This prevents attackers from confirming whether a user exists or is locked out.
			throw new AppError(
				'errors.password_reset_not_initiated',
				{},
				AppStatusCode.PASSWORD_RESET_NOT_INITIATED,
				200
			);
		}

		await UserRepository.updatePassword(userId, await hashPassword(password));
		await sendPasswordChangedEmail({ userEmail: user.email, t: request.t });
		response.status(204).end();
	} catch (error) {
		if (error instanceof AppError) {
			if (error.code === AppStatusCode.USER_NOT_FOUND) {
				// Hide actual user existence to prevent user enumeration; respond with generic activation failure message.
				response
					.status(401)
					.json(
						createMessageResponse(
							request.t('errors.password_reset_failed'),
							'error',
							AppStatusCode.PASSWORD_RESET_FAILED
						)
					);
			} else {
				response
					.status(error.httpStatusCode)
					.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			}
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
};

export const acceptTerms = async (request: Request, response: Response): Promise<void> => {
	const { acceptTerms } = request.body;
	const userId = request.session?.user?.id;
	const termsAccepted = request.session?.termsAccepted;

	try {
		if (termsAccepted === true) {
			response
				.status(403)
				.json(
					createMessageResponse(
						request.t('errors.terms_already_accepted'),
						'info',
						AppStatusCode.TERMS_ALREADY_ACCEPTED
					)
				);
			return;
		}

		await UserRepository.acceptTerms(userId, acceptTerms);

		// This change will be automatically persisted in Redis at the end of the request
		request.session.termsAccepted = acceptTerms;

		await issueNewAccessToken(request, response); // Re-issue updated token

		response.status(204).end();
	} catch (error) {
		if (error instanceof AppError) {
			response
				.status(error.httpStatusCode)
				.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
};

export const verifyLogin2FA = async (request: Request, response: Response): Promise<void> => {
	const userId = request.session?.user?.id;
	const pending2FA = request.session?.pending2FA;

	try {
		const { code } = request.body;

		if (!pending2FA) {
			response
				.status(403)
				.json(
					createMessageResponse(
						request.t('errors.2fa_verification_not_pending'),
						'error',
						AppStatusCode.TWO_FA_VERIFICATION_NOT_PENDING
					)
				);
			return;
		}

		const twofaSecret = await UserRepository.getUser2FASecretById(userId);

		const isValid = authenticator.verify({ token: code, secret: twofaSecret });
		if (!isValid) {
			throw new AppError(
				'errors.2fa_verification_code_invalid',
				{},
				AppStatusCode.TWO_FA_VERIFICATION_CODE_INVALID,
				400
			);
		}

		// Clear pending2FA flag
		request.session.pending2FA = false;

		await issueNewAccessToken(request, response);

		const user = await UserRepository.getUserById(userId);
		response.status(200).json(user);
	} catch (error) {
		if (error instanceof AppError) {
			if (error.code === AppStatusCode.USER_NOT_FOUND) {
				// Hide actual user existence to prevent user enumeration; respond with generic activation failure message.
				response
					.status(401)
					.json(
						createMessageResponse(
							request.t('errors.2fa_verification_failed'),
							'error',
							AppStatusCode.TWO_FA_VERIFICATION_FAILED
						)
					);
			} else {
				response
					.status(error.httpStatusCode)
					.json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
			}
			return;
		}
		logger.error(error);
		response
			.status(500)
			.json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
	}
};
