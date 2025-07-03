import request from 'supertest';
import express from 'express';
import { refresh } from '../../authController';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n';
import session from 'express-session';
import GlobalConfig from '../../../config';
import { RefreshTokenStore } from '../../../lib/redis/redis-token';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

jest.mock('../../../lib/redis/redis-token');
jest.mock('../../../repositories/users');

const app = express();
app.use(session({
    secret: GlobalConfig.SESSION_SECRET,
    resave: false,
    rolling: true, // This enables automatic touch
    saveUninitialized: false,
    cookie: {
        secure: false, // secure: true requires HTTPS, which is usually off in dev
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

app.post('/auth/refresh', refresh);

describe('POST /auth/refresh', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('should 403 when no refresh_token cookie', async () => {
        const response = await request(app).post('/auth/refresh');
        expect(response.status).toBe(403);
        expect(response.body).toEqual({ messages: [{text:'An unexpected error occurred. Please retry to log in.', severity: "error"}]});
    });

    it('should 403 when refresh_token does not match stored', async () => {
        (RefreshTokenStore.getStoredRefreshToken as jest.Mock).mockResolvedValue('stored-token');

        const agent = request.agent(app);

        // Setup session dynamically
        await agent
            .post('/test/session')
            .send({ user: { id: 1, email: 'test@example.com' }, pending2FA: false });

        const response = await agent.post('/auth/refresh').set('Cookie', 'refresh_token=bad-token; connect.sid=session-id')

        expect(RefreshTokenStore.getStoredRefreshToken).toHaveBeenCalledWith(1, 'bad-token');
        expect(response.status).toBe(403);
        expect(response.body).toEqual({ messages: [{text:'An unexpected error occurred. Please retry to log in.', severity: "error"}]});
    });

    it('should return 500 if an unexpected error occurs', async () => {
        (RefreshTokenStore.getStoredRefreshToken as jest.Mock).mockRejectedValue(new Error('internal error'));

        const agent = request.agent(app);

        // Setup session dynamically
        await agent
            .post('/test/session')
            .send({ user: { id: 1, email: 'test@example.com' }, pending2FA: false });

        const response = await agent.post('/auth/refresh').set('Cookie', 'refresh_token=bad-token; connect.sid=session-id')

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ messages: [{text:'An unexpected error occurred. Please try again later or contact support.', severity: "error"}]});
    });

    it('should 204 and set new access_token cookie when valid', async () => {
        const fakeTime = new Date('2025-05-15T00:00:00Z');
        jest.useFakeTimers({ legacyFakeTimers: false });
        jest.setSystemTime(fakeTime);

        const validToken = 'good-token';
        (RefreshTokenStore.getStoredRefreshToken as jest.Mock).mockResolvedValue(validToken);
        (RefreshTokenStore.resetRefreshTokenExpiration as jest.Mock).mockResolvedValue(undefined);

        const agent = request.agent(app);

        const userSession = { user: { id: 1, email: 'test@example.com' } };

        // Setup session dynamically
        await agent.post('/test/session').send(userSession);

        const response = await agent.post('/auth/refresh').set('Cookie', `refresh_token=${validToken}; connect.sid=session-id`);
        expect(response.status).toBe(204);

        expect(RefreshTokenStore.resetRefreshTokenExpiration).toHaveBeenCalledWith(userSession.user.id, validToken);

        const cookies = response.headers['set-cookie'] as unknown as string[];
        expect(cookies).toBeDefined();
        expect(cookies.length).toBeGreaterThanOrEqual(2);

        const accessTokenCookie = cookies.filter(x => x.startsWith("access_token="))[0];
        const tokenMatch  = accessTokenCookie!.match(/access_token=([^;]+)/);
        const accessToken = tokenMatch?.[1];
        expect(accessToken).toBeDefined();

        const decoded = jwt.decode(accessToken!) as jwt.JwtPayload;

        expect(decoded).toHaveProperty('userId', userSession.user.id);
        expect(decoded).toHaveProperty('exp', fakeTime.getTime()/1000 + GlobalConfig.ACCESS_TOKEN_MAX_AGE);
        expect(decoded).toHaveProperty('iat', fakeTime.getTime()/1000);

        jest.useRealTimers();
      });

    it('should handle pending 2FA true state correctly', async () => {
        const fakeTime = new Date('2025-05-15T00:00:00Z');
        jest.useFakeTimers({ legacyFakeTimers: false });
        jest.setSystemTime(fakeTime);

        const validToken = 'good-token';
        (RefreshTokenStore.getStoredRefreshToken as jest.Mock).mockResolvedValue(validToken);
        (RefreshTokenStore.resetRefreshTokenExpiration as jest.Mock).mockResolvedValue(undefined);

        const agent = request.agent(app);

        const userSession = { user: { id: 1, email: 'test@example.com' }, pending2FA: true };

        // Setup session dynamically
        await agent.post('/test/session').send(userSession);

        const response = await agent.post('/auth/refresh').set('Cookie', "refresh_token=good-token; connect.sid=session-id");
        expect(response.status).toBe(204);


        const cookies = response.headers['set-cookie'] as unknown as string[];
        expect(cookies).toBeDefined();
        expect(cookies.length).toBeGreaterThanOrEqual(2);

        const accessTokenCookie = cookies.filter(x => x.startsWith("access_token="))[0];
        const tokenMatch  = accessTokenCookie!.match(/access_token=([^;]+)/);
        const accessToken = tokenMatch?.[1];
        expect(accessToken).toBeDefined();

        const decoded = jwt.decode(accessToken!) as jwt.JwtPayload;

        expect(decoded).toHaveProperty('pending2FA', userSession.pending2FA);

        jest.useRealTimers();
    });
});
