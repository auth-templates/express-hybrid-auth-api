import { Request, Response } from 'express';
import { UserRepository } from '../repositories/users';
import { get2faSetup, verify2faSetup } from '../lib/redis/redis-2fa';
import { AppError } from '../lib/error';
import { generateToken } from '../lib/token';
import { save2FAToken } from './authController';
import { VerificationTokensRepository } from '../repositories/verification-tokens';
import { send2FADisabledEmail, send2FARecoverEmail } from '../lib/mailer';

export const setup2FA = async (request: Request, response: Response): Promise<void> => {
    const userId = request.session.user.id;
    const userEmail = request.session.user.email;

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
    const userId = request.session.user.id;

    const { code } = request.body;
    try {
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
        response.status(500).json({ message: request.t('2fa.setup_verification_failed') });
    }
};

export const disable2FA = async (request: Request, response: Response): Promise<void> => {
    const userId = request.session.user.id;

    try {
        await UserRepository.disable2FA(userId);
        response.status(204);
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
        await save2FAToken(user.id, tokenFingerprint, hashedToken);
        await send2FARecoverEmail({verificationCode: token, userEmail, expiresInMinutes: 1440, t: request.t});
        response.status(204);
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
    const token = request.query.token as string;
    try {
        const { userId } = await VerificationTokensRepository.verify2FAToken(token);
        await UserRepository.disable2FA(userId);
        await send2FADisabledEmail({t: request.t});
        response.status(204).send();
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
                message: request.t(error.translationKey, error.params),
            });
            return
        }
        response.status(500).json({ message: request.t('errors.internal') });
    }
}