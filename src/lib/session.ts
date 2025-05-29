import { Request, Response } from 'express';
import { User } from '../models/user';
import { createAccessToken, createSecureRandomToken } from '../lib/token';

import GlobalConfig from '../config';
import { RefreshTokenStore } from '../lib/redis/redis-token';

export function setCookieTokens(response: Response, tokens: { name: string; value: string; maxAge: number }[]) {
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

export async function initializeUserSession(request: Request, response: Response, user: User) {
    setSessionData(request, user);

    const refreshToken = createSecureRandomToken();
    await RefreshTokenStore.storeRefreshToken(user.id, refreshToken);

    const newAccessToken = createAccessToken({ userId: user.id, pending2FA: user.enabled2FA })

    setCookieTokens(response, [
        { name: 'refresh_token', value: refreshToken, maxAge: GlobalConfig.SESSION_MAX_AGE },
        { name: 'access_token', value: newAccessToken, maxAge: GlobalConfig.ACCESS_TOKEN_MAX_AGE }
    ]);
}

export async function destroyUserSession(request: Request, response: Response) {
    request.session.destroy((err) => {
        response.clearCookie('connect.sid');
        response.clearCookie('access_token');
        response.clearCookie('refresh_token');
        response.status(204).end();
    });
}