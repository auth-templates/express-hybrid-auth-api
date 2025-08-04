import request from 'supertest';
import express from 'express';
import { acceptTerms } from '../../authController.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import session from 'express-session';
import GlobalConfig from '../../../config.js';
import cookieParser from 'cookie-parser';
import { UserRepository } from '../../../repositories/users.js';
import * as jwt from 'jsonwebtoken';
import { RefreshTokenStore } from '../../../lib/redis/redis-token.js';
import { AppStatusCode } from '@/@types/status-code.js';

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

app.post('/auth/accept-terms', acceptTerms);

describe('POST /auth/accept-terms', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should 204, update session, and set access_token cookie when successful', async () => {
        const fakeTime = new Date('2025-05-15T00:00:00Z');
        jest.useFakeTimers({ legacyFakeTimers: false });
        jest.setSystemTime(fakeTime);

        const validToken = 'good-token';
        (UserRepository.acceptTerms as jest.Mock).mockResolvedValue(undefined);
        (RefreshTokenStore.getStoredRefreshToken as jest.Mock).mockResolvedValue('good-token');
        (RefreshTokenStore.resetRefreshTokenExpiration as jest.Mock).mockResolvedValue(undefined);

        const agent = request.agent(app);

        const userSession = { user: { id: 1, email: 'test@example.com' }, termsAccepted: false };
        await agent.post('/test/session').send(userSession);

        const response = await agent.post('/auth/accept-terms').send({acceptTerms: true}).set('Cookie', `refresh_token=${validToken}; connect.sid=session-id`);

        expect(UserRepository.acceptTerms).toHaveBeenCalledWith(userSession.user.id, true);
        expect(response.status).toBe(204);

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
        expect(sessionCheck.body.termsAccepted).toBe(true);

        jest.useRealTimers();
    });

    it('should return 403 if terms already accepted', async () => {
        const agent = request.agent(app);

        const userSession = {
            user: { id: 1, email: 'test@example.com' },
            termsAccepted: true
        };

        await agent.post('/test/session').send(userSession);

        const response = await agent.post('/auth/accept-terms');

        expect(response.status).toBe(403);
        expect(UserRepository.acceptTerms).not.toHaveBeenCalled();
    });

    it('should return 500 if an unexpected error occurs', async () => {
        (UserRepository.acceptTerms as jest.Mock).mockRejectedValue(new Error('internal error'));

        const agent = request.agent(app);
        const userSession = { user: { id: 1, email: 'test@example.com' }, termsAccepted: false };

        await agent.post('/test/session').send(userSession);

        const response = await agent.post('/auth/accept-terms');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({messages: [{ text:'An unexpected error occurred. Please try again later or contact support.', severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });
});
