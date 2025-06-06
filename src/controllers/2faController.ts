import { Request, Response } from 'express';
import { UserRepository } from '../repositories/users';
import { get2faSetup, verify2faSetup } from '../lib/redis/redis-2fa';
import { AppError } from '../lib/error';
import { generateToken } from '../lib/token';
import { VerificationTokensRepository } from '../repositories/verification-tokens';
import { send2FADisabledEmail, send2FARecoverEmail } from '../lib/mailer';
import { validate2FAData } from '../lib/validation-schemas/2fa-schema';
import GlobalConfig from '../config';
import { TokenType } from '../models/verification-token';
import { UserStatus } from '../models/user';

export async function save2FAToken(userId: number, tokenFingerprint: string, hashedToken: string, expiresInMinutes: number): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

    await VerificationTokensRepository.createToken({
        userId: userId,
        tokenHash: hashedToken,
        tokenFingerprint: tokenFingerprint,
        type: TokenType.TwoFA,
        expiresAt: expiresAt
    })
}

export const setup2FA = async (request: Request, response: Response): Promise<void> => {
    const userId = request.session?.user?.id;
    const userEmail = request.session?.user?.email;

    try {
        const { qrCodeUrl, secret } = await get2faSetup(userId, userEmail);
        response.status(200).json({ qrCodeUrl, secret });
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

export const verify2FASetup = async (request: Request, response: Response): Promise<void> => {
    const userId = request.session?.user?.id;

    const { code } = request.body;
    try {
        const issues = validate2FAData({ code });

        if ( issues.length > 0 ) {
            response.status(400).json(
                [issues[0]].map(({message, items}) => ({message: request.t(message, items)}))[0]
            );
            return
        }

        const twoStepSecret = await verify2faSetup(userId, code);

        await UserRepository.verifyAndSaveSecret(userId, twoStepSecret);

        response.status(200).json({ message: request.t('2fa.setup_verified')});
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

export const disable2FA = async (request: Request, response: Response): Promise<void> => {
    const userId = request.session?.user?.id;

    try {
        await UserRepository.disable2FA(userId);
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

export const recover2FA = async (request: Request, response: Response): Promise<void> => {
    const { userEmail } = request.body;
    
    try {
        const { token, tokenFingerprint, hashedToken } = await generateToken();
        const user = await UserRepository.getUserByEmail(userEmail); 

        if( user.status !== UserStatus.Active || !user.enabled2FA ) {
            throw new AppError('errors.2fa_recovery_not_allowed', {}, 200) // 200 is on purpose because this This prevents attackers from confirming whether a user exists or is locked out.
        }

        const expiresInMinutes = GlobalConfig.TWOFA_RECOVERY_TOKEN_MAX_AGE / 1000 / 60;
        await save2FAToken(user.id, tokenFingerprint, hashedToken, expiresInMinutes);
        await send2FARecoverEmail({verificationCode: token, userEmail, expiresInMinutes, t: request.t });
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

export const confirm2FARecover = async (request: Request, response: Response): Promise<void> => {
    const { token }= request.body;
    try {
        const { userId } = await VerificationTokensRepository.verify2FAToken(token);
        await UserRepository.disable2FA(userId);
        const user = await UserRepository.getUserById(userId);
        await send2FADisabledEmail({t: request.t, userEmail: user.email });
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