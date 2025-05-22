import { Request, Response } from 'express';
import { hashPassword } from "../lib/password";
import { validateSignupData } from '../lib/validation-schemas/signup-schema';
import { UserRepository } from '../repositories/users';
import { AppError } from '../lib/error';
import { Role, User, UserStatus } from '../models/user';
import { sendAccountActivationEmail, sendPasswordChangedEmail, sendPasswordResetEmail, sendVerificationEmail } from '../lib/mailer';
import { createAccessToken, createSecureRandomToken, generateToken } from '../lib/token';
import { VerificationTokensRepository } from '../repositories/verification-tokens';
import { TokenType } from '../models/verification-token';
import { validateLoginData } from '../lib/validation-schemas/login-schema';
import GlobalConfig from '../config';
import { RefreshTokenStore } from '../lib/redis/redis-token';
import { validatePassword } from '../lib/validation-schemas/password-schema';

export async function savePassswordResetToken(userId: number, tokenFingerprint: string, hashedToken: string, expiresInMinutes: number): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);
    await VerificationTokensRepository.createToken({
        userId: userId,
        tokenHash: hashedToken,
        tokenFingerprint: tokenFingerprint,
        type: TokenType.PasswordReset,
        expiresAt: expiresAt
    })
}

export async function saveSignupToken(userId: number, tokenFingerprint: string, hashedToken: string, expiresInMinutes: number): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);
    await VerificationTokensRepository.createToken({
        userId: userId,
        tokenHash: hashedToken,
        tokenFingerprint: tokenFingerprint,
        type: TokenType.SignUp,
        expiresAt: expiresAt
    })
}

export const verifySignup = async (request: Request, response: Response): Promise<void> => {
    const { token } = request.body;
    try {
        const { userId } = await VerificationTokensRepository.verifySignupToken(token);
        await UserRepository.updateUserStatus(userId, UserStatus.Active)
        await sendAccountActivationEmail({t: request.t});
        response.status(204).send();
    } catch (error) {
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
              message: request.t(error.translationKey, error.params),
            });
            return
        }
        response.status(500).json({ message: request.t('errors.internal') });
    }
}

export const signup = async (request: Request, response: Response): Promise<void> => {
    try {
        const issues = validateSignupData(request.body);

        if ( issues.length > 0 ) {
            response.status(400).json(
                issues.map(({message, items}) => request.t(message, items))
            );
            return
        }

        const { firstName, lastName, email, password, role } = request.body; 

        const id = await UserRepository.createUser({
            firstName,
            lastName,
            email,
            passwordHash: await hashPassword(password),
            role: role as Role
        });
        const expiresInMinutes = GlobalConfig.SIGNUP_TOKEN_MAX_AGE / 1000 / 60;
        const {token, tokenFingerprint, hashedToken} = await generateToken();
        await saveSignupToken(id, tokenFingerprint, hashedToken, expiresInMinutes);
        await sendVerificationEmail({token, userEmail: email, expiresInMinutes, t: request.t});
        response.status(204).send();
    } catch ( error ) {
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
              message: request.t(error.translationKey, error.params),
            });
            return
        }
        response.status(500).json({ message: request.t('errors.internal') });
    }
}

function setCookieTokens(response: Response, tokens: { name: string; value: string; maxAge: number }[]) {
    const isProduction = process.env.NODE_ENV === 'production';

    tokens.forEach(({ name, value, maxAge }) => {
        response.cookie(name, value, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge
        });
    });
}

function setSessionData(request: Request, user: User) {
    request.session.user = {
        id: user.id,
        email: user.email,
    };
    request.session.pending2FA = user.enabled2FA;
}

export const login = async (request: Request, response: Response): Promise<void> => {
    const { email, password } = request.body;
    
    try {
        const issues = validateLoginData({email, password});

        if ( issues.length > 0 ) {
            response.status(400).json(
                [issues[0]].map(({message, items}) => ({message: request.t(message, items)}))
            );
            return
        }

        const user = await UserRepository.login(email, password);
        setSessionData(request, user);

        const refreshToken = createSecureRandomToken();
        await RefreshTokenStore.storeRefreshToken(user.id, refreshToken);

        const newAccessToken = createAccessToken({ userId: user.id, pending2FA: user.enabled2FA })

        setCookieTokens(response, [
            { name: 'refresh_token', value: refreshToken, maxAge: GlobalConfig.SESSION_MAX_AGE },
            { name: 'access_token', value: newAccessToken, maxAge: GlobalConfig.ACCESS_TOKEN_MAX_AGE }
        ]);

        response.status(200).send(user);
    } catch (error) {
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
              message: request.t(error.translationKey, error.params),
            });
            return
        }
        response.status(500).json({ message: request.t('errors.internal') });
    }
};

export const logout = async (request: Request, response: Response): Promise<void> => {
    const userId = request.session?.user?.id;
    const refreshToken = request.cookies?.refreshToken;
    try {
        await RefreshTokenStore.removeRefreshToken(userId, refreshToken);

        request.session.destroy((err) => {
            response.clearCookie('connect.sid');
            response.clearCookie('access_token');
            response.clearCookie('refresh_token');
            response.status(204).end();
        });
    } catch (error) {
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
              message: request.t(error.translationKey, error.params),
            });
            return
        }
        response.status(500).json({ message: request.t('errors.internal') });
    }
}

export const refresh = async (request: Request, response: Response): Promise<void> => {
    const refreshToken = request.cookies?.refreshToken;
    const userId = request.session?.user?.id;
    const pending2FA = request.session?.pending2FA;
    try {
        const stored = await RefreshTokenStore.getStoredRefreshToken(userId, refreshToken);
        if ( !refreshToken || refreshToken !== stored ) {
            response.status(403).json({ message: 'Invalid refresh token' });
            return;
        }
     
        await RefreshTokenStore.resetRefreshTokenExpiration(userId, refreshToken);

        const newAccessToken = createAccessToken({ userId, pending2FA })

        setCookieTokens(response, [
            { name: 'access_token', value: newAccessToken, maxAge: GlobalConfig.ACCESS_TOKEN_MAX_AGE }
        ]);
        response.status(204).end();
    } catch (error) {
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
                message: request.t(error.translationKey, error.params),
            });
            return
        }
        response.status(500).json({ message: request.t('errors.internal') });
    }
}

export const resetPassword = async (request: Request, response: Response): Promise<void> => {
    const { userEmail } = request.body;
    
    try {
        const { token, tokenFingerprint, hashedToken } = await generateToken();
        const user = await UserRepository.getUserByEmail(userEmail); 

        if( user.status !== UserStatus.Active ) {
            throw new AppError('errors.password_reset_not_allowed', {}, 200) // 200 is on purpose because this This prevents attackers from confirming whether a user exists or is locked out.
        }

        const expiresInMinutes = GlobalConfig.PASSWORD_RESET_TOKEN_MAX_AGE / 1000 / 60;
        await savePassswordResetToken(user.id, tokenFingerprint, hashedToken, expiresInMinutes);
        await sendPasswordResetEmail({verificationCode: token, userEmail, expiresInMinutes, t: request.t});
        response.status(204).end();
    } catch (error) {
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
                message: request.t(error.translationKey, error.params),
            });
            return
        }
        response.status(500).json({ message: request.t('errors.internal') });
    }
}

export const confirmResetPassword = async (request: Request, response: Response): Promise<void> => {
    const { password, token } = request.body;
    
    try {
        const issues = validatePassword(password);

        if ( issues.length > 0 ) {
            response.status(400).json(
               issues.map(({message, items}) => request.t(message, items))
            );
            return
        }

        const { userId } = await VerificationTokensRepository.verifyPasswordResetToken(token);
        const user = await UserRepository.getUserById(userId); 

        if( user.status !== UserStatus.Active ) {
            throw new AppError('errors.password_reset_not_allowed', {}, 200) // 200 is on purpose because this This prevents attackers from confirming whether a user exists or is locked out.
        }

        await UserRepository.updatePassword(userId, await hashPassword(password)); 
        await sendPasswordChangedEmail({userEmail: user.email, t: request.t});
        response.status(204).end();
    } catch (error) {
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
                message: request.t(error.translationKey, error.params),
            });
            return
        }
        response.status(500).json({ message: request.t('errors.internal') });
    }
}