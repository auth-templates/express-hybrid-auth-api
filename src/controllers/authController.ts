import { Request, Response } from 'express';
import { hashPassword } from "../lib/password";
import { validateSignupData } from '../lib/validation-schemas/signup-schema';
import { UserRepository } from '../repositories/users';
import { AppError } from '../lib/error';
import { Role, UserStatus } from '../models/user';
import { sendAccountActivationEmail, sendVerificationEmail } from '../lib/mailer';
import { generateToken } from '../lib/token';
import { VerificationTokensRepository } from '../repositories/verification-tokens';
import { TokenType } from '../models/verification-token';
import { validateLoginData } from '../lib/validation-schemas/login-schema';
import { redisClient } from '../lib/redis/client';
import jwt from 'jsonwebtoken';
import { RedisController } from '../lib/redis/redis-controller';
import GlobalConfig from '../config';
import { randomBytes } from 'node:crypto'

function createSecureRandomToken(): string {
  return randomBytes(48).toString('hex'); // 96-character hex string
}

const redisController = new RedisController(redisClient);

export async function saveSignupToken(userId: number, tokenFingerprint: string, hashedToken: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    await VerificationTokensRepository.createToken({
        userId: userId,
        tokenHash: hashedToken,
        tokenFingerprint: tokenFingerprint,
        type: TokenType.SignUp,
        expiresAt: expiresAt
    })
}

export async function save2FAToken(userId: number, tokenFingerprint: string, hashedToken: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    await VerificationTokensRepository.createToken({
        userId: userId,
        tokenHash: hashedToken,
        tokenFingerprint: tokenFingerprint,
        type: TokenType.TwoFA,
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
        const {token, tokenFingerprint, hashedToken} = await generateToken();
        await saveSignupToken(id, tokenFingerprint, hashedToken);
        await sendVerificationEmail({token, t: request.t});
        response.status(204).send();
    } catch ( error ) {
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

export const login = async (request: Request, response: Response): Promise<void> => {
    const { email, password } = request.body;

    try {
        const issues = validateLoginData(request.body);

        if ( issues.length > 0 ) {
            response.status(400).json(
                [issues[0]].map(({message, items}) => request.t(message, items))
            );
            return
        }

        const user = await UserRepository.login(email, password);
        
        request.session.user = {
            id: user.id,
            email: user.email
        };
        request.session.pending2FA = user.enabled2FA;

        const refreshToken = createSecureRandomToken();

        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: GlobalConfig.SESSION_MAX_AGE / 1000
        });
        
        await redisController.add(`refresh:${user.id}:${refreshToken}`, refreshToken, GlobalConfig.SESSION_MAX_AGE / 1000);

        const newAccessToken = jwt.sign(
            { userId: user.id, pending2FA: user.enabled2FA },
            GlobalConfig.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        response.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: GlobalConfig.ACCESS_TOKEN_MAX_AGE
        });

        response.status(200).send(user);
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
};

export const logout = async (request: Request, response: Response): Promise<void> => {
    const userId = request.session.user.id;
    const refreshToken = request.cookies.refreshToken;
    try {
        await redisController.remove(`refresh:${userId}:${refreshToken}`);

        request.session.destroy((err) => {
            response.clearCookie('ssid');
            response.clearCookie('refresh_token');
        });

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

export const refresh = async (request: Request, response: Response): Promise<void> => {
    const refreshToken = request.cookies.refreshToken;
    const ssid = request.cookies.ssid;
    const userId = request.session.user.id;
    const pending2FA = request.session.pending2FA;

    const stored = await redisController.get(`refresh:${ssid}:${refreshToken}`);

    if ( !refreshToken || refreshToken !== stored ) {
        response.status(403).json({ message: 'Invalid refresh token' });
        return;
    }

    await redisController.resetExpiration(`refresh:${userId}:${refreshToken}`, GlobalConfig.SESSION_MAX_AGE / 1000);

    const newAccessToken = jwt.sign(
        { userId: userId, pending2FA: pending2FA },
        GlobalConfig.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );

    response.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: GlobalConfig.ACCESS_TOKEN_MAX_AGE
    });

    response.status(204);
}