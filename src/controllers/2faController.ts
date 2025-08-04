import { Request, Response } from 'express';
import { UserRepository } from '../repositories/users.js';
import { get2faSetup, verify2faSetup } from '../lib/redis/redis-2fa.js';
import { AppError } from '../lib/error.js';
import { generateToken } from '../lib/token.js';
import { VerificationTokensRepository } from '../repositories/verification-tokens.js';
import { send2FADisabledEmail, send2FARecoverEmail } from '../lib/mailer.js';
import { validate2FAData } from '../lib/validation-schemas/2fa-schema.js';
import GlobalConfig from '../config.js';
import { TokenType } from '../models/verification-token.js';
import { UserStatus } from '../models/user.js';
import { createMessageResponse } from '../lib/response.js';
import logger from '@/lib/logger/index.js';
import { AppStatusCode } from '@/@types/status-code.js';
import { validateEmail } from '@/lib/validation-schemas/email-validation-schema.js';

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
        logger.error(error);
        response.status(500).json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
    }
}

export const verify2FASetup = async (request: Request, response: Response): Promise<void> => {
    const userId = request.session?.user?.id;

    const { code } = request.body;
    try {
        const issues = validate2FAData({ code });

        if ( issues.length > 0 ) {
            response.status(400).json(createMessageResponse(
                [issues[0]].map(({message, items}) => request.t(message, items)) as string[],  
                'error',
            ));
            return
        }

        const twoStepSecret = await verify2faSetup(userId, code);

        await UserRepository.verifyAndSaveSecret(userId, twoStepSecret);

        response.status(200).json(createMessageResponse(request.t('2fa.setup_verified'), 'info', AppStatusCode.TWO_FA_SETUP_SUCCESS));
    } catch (error) {
        if (error instanceof AppError) {
            response.status(error.httpStatusCode).json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
            return
        }
        logger.error(error);
        response.status(500).json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
    }
};

export const disable2FA = async (request: Request, response: Response): Promise<void> => {
    const userId = request.session?.user?.id;

    try {
        await UserRepository.disable2FA(userId);
        response.status(204).end();
    } catch (error) {
        if (error instanceof AppError) {
            response.status(error.httpStatusCode).json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
            return
        }
        logger.error(error);
        response.status(500).json(createMessageResponse(request.t('errors.internal'), "error", AppStatusCode.INTERNAL_SERVER_ERROR));
    }
}

export const recover2FA = async (request: Request, response: Response): Promise<void> => {
    const { userEmail } = request.body;
    
    try {
        const issues = validateEmail({email: userEmail});

        if ( issues.length > 0 ) {
            response.status(400).json(createMessageResponse(
                issues.map(({message, items}) => request.t(message, items)) as string [], 
                'error'
            ));
            return
        }
        
        const user = await UserRepository.getUserByEmail(userEmail); 

        if( user.status !== UserStatus.Active || !user.enabled2FA ) {
            throw new AppError('errors.2fa_recovery_not_initiated', {}, AppStatusCode.TWO_FA_RECOVERY_NOT_INITIATED, 200) // 200 is on purpose because this This prevents attackers from confirming whether a user exists or is locked out.
        }

        const { token, tokenFingerprint, hashedToken } = await generateToken();
        const expiresInMinutes = GlobalConfig.TWOFA_RECOVERY_TOKEN_MAX_AGE / 1000 / 60;
        await save2FAToken(user.id, tokenFingerprint, hashedToken, expiresInMinutes);
        await send2FARecoverEmail({verificationCode: token, userEmail, expiresInMinutes, t: request.t });
        response.status(204).end();
    } catch (error) {
        if (error instanceof AppError) {
            if (error.code === AppStatusCode.USER_NOT_FOUND) {
                // Hide actual user existence to prevent user enumeration; respond with generic activation failure message.
                response.status(401).json(createMessageResponse(request.t('errors.email_2fa_recovery_send_failed'), 'error', AppStatusCode.EMAIL_TWO_FA_RECOVERY_SEND_FAILED))
            } else {
                response.status(error.httpStatusCode).json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
            }
            return
        }
        logger.error(error);
        response.status(500).json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
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
            if (error.code === AppStatusCode.USER_NOT_FOUND) {
                // Hide actual user existence to prevent user enumeration; respond with generic activation failure message.
                response.status(401).json(createMessageResponse(request.t('errors.2fa_recovery_failed'), 'error', AppStatusCode.TWO_FA_RECOVERY_FAILED))
            } else {
                response.status(error.httpStatusCode).json(createMessageResponse(request.t(error.translationKey, error.params), 'error', error.code));
            }
            return
        }
        logger.error(error);
        response.status(500).json(createMessageResponse(request.t('errors.internal'), 'error', AppStatusCode.INTERNAL_SERVER_ERROR));
    }
}