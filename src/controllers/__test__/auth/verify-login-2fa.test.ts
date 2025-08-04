import request from 'supertest';
import express from 'express';
import { verifyLogin2FA } from '../../authController.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import session from 'express-session';
import GlobalConfig from '../../../config.js';
import cookieParser from 'cookie-parser';
import { UserRepository } from '../../../repositories/users.js';
import * as jwt from 'jsonwebtoken';
import { RefreshTokenStore } from '../../../lib/redis/redis-token.js';
import * as otplib from 'otplib';
import { AppStatusCode } from '@/@types/status-code.js';

jest.mock('otplib', () => ({
    authenticator: {
        verify: jest.fn(),
    },
}));

jest.mock('../../../lib/redis/redis-token');
jest.mock('../../../repositories/users');

const app = express();
app.use(session({
    secret: GlobalConfig.SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: GlobalConfig.SESSION_MAX_AGE
    }
}));

app.use(i18nMiddleware);
app.use(express.json());
app.use(cookieParser());

app.post('/test/session', (req, res) => {
    Object.assign(req.session, req.body);
    res.status(200).end();
});

app.get('/test/session', (req, res) => {
  res.json(req.session);
});

app.post('/auth/verify-2fa', verifyLogin2FA);

const validUser2FA = {
    id: 2,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: 'admin',
    createdAt: new Date(),
    enabled2FA: true
};

describe('POST /auth/verify-2fa', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 204, update session, and set access_token cookie when successful', async () => {
        const fakeTime = new Date('2025-05-15T00:00:00Z');
        jest.useFakeTimers({ legacyFakeTimers: false });
        jest.setSystemTime(fakeTime);

        const twofaSecret = 'twofasecret';
        const validToken = 'good-token';
        (otplib.authenticator.verify as jest.Mock).mockReturnValue(true);
        (UserRepository.getUser2FASecretById as jest.Mock).mockResolvedValue(twofaSecret);
        (UserRepository.getUserById as jest.Mock).mockResolvedValue(validUser2FA);
        (RefreshTokenStore.getStoredRefreshToken as jest.Mock).mockResolvedValue('good-token');
        (RefreshTokenStore.resetRefreshTokenExpiration as jest.Mock).mockResolvedValue(undefined);

        const agent = request.agent(app);

        const userSession = { user: { id: 1, email: 'test@example.com' }, pending2FA: true };
        await agent.post('/test/session').send(userSession);

        const code = "123456";
        const response = await agent.post('/auth/verify-2fa').set('Cookie', `refresh_token=${validToken}; connect.sid=session-id`).send({code});

        expect(UserRepository.getUser2FASecretById).toHaveBeenCalledWith(userSession.user.id);
        expect(otplib.authenticator.verify).toHaveBeenCalledWith({secret: twofaSecret, token: code });
        expect(response.status).toBe(200);
      
        expect(response.body).toEqual({...validUser2FA, createdAt: validUser2FA.createdAt.toISOString()});

        const cookies = response.headers['set-cookie'] as unknown as string[];
        expect(cookies).toBeDefined();
        expect(cookies.length).toBeGreaterThanOrEqual(2);

        const accessTokenCookie = cookies.filter(x => x.startsWith("access_token="))[0];
        const tokenMatch  = accessTokenCookie!.match(/access_token=([^;]+)/);
        const accessToken = tokenMatch?.[1];
        expect(accessToken).toBeDefined();

        const decoded = jwt.decode(accessToken!) as jwt.JwtPayload;
        expect(decoded).toHaveProperty('userId', userSession.user.id);
        expect(decoded).toHaveProperty('exp', fakeTime.getTime() / 1000 + GlobalConfig.ACCESS_TOKEN_MAX_AGE);
        expect(decoded).toHaveProperty('iat', fakeTime.getTime() / 1000);

        // Validate session update
        const sessionCheck = await agent.get('/test/session');
        expect(sessionCheck.body.pending2FA).toBe(false);

        jest.useRealTimers();
    });

    
    it('should return 403 if no user or no pending2FA in session', async () => {
        const agent = request.agent(app);

        // No user, no pending2FA
        await agent.post('/test/session').send({});

        const response = await agent.post('/auth/verify-2fa').send({ code: '123456' });

        expect(response.status).toBe(403);
        expect(UserRepository.getUser2FASecretById).not.toHaveBeenCalled();
    });

    it('should return 400 if 2FA code is invalid', async () => {
        (UserRepository.getUser2FASecretById as jest.Mock).mockResolvedValue('secret');
        (otplib.authenticator.verify as jest.Mock).mockReturnValue(false);

        const agent = request.agent(app);
        const userSession = { user: { id: 1, email: 'test@example.com' }, pending2FA: true };
        await agent.post('/test/session').send(userSession);

        const response = await agent.post('/auth/verify-2fa').send({ code: 'invalid-code' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text:'The verification code you entered is invalid. Please try again.', severity: "error"}], code: AppStatusCode.TWO_FA_VERIFICATION_CODE_INVALID});
    });

    it('should return 500 if unexpected error occurs', async () => {
        (UserRepository.getUser2FASecretById as jest.Mock).mockRejectedValue(new Error('db error'));

        const agent = request.agent(app);
        const userSession = { user: { id: 1, email: 'test@example.com' }, pending2FA: true };
        await agent.post('/test/session').send(userSession);

        const response = await agent.post('/auth/verify-2fa').send({ code: '123456' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({messages:[{text:'An unexpected error occurred. Please try again later or contact support.', severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });
});
