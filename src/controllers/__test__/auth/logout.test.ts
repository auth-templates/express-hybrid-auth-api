import request from 'supertest';
import express from 'express';
import { logout } from '../../authController.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import session from 'express-session';
import GlobalConfig from '../../../config.js';
import { RefreshTokenStore } from '../../../lib/redis/redis-token.js';
import cookieParser from 'cookie-parser';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('../../../lib/redis/redis-token.js');
vi.mock('../../../repositories/users.js');

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

app.post('/auth/logout', logout);

describe('POST /auth/logout', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should 204 and clear cookies on successful logout', async () => {
        (RefreshTokenStore.removeRefreshToken as vi.Mock).mockResolvedValue('stored-token');

        const agent = request.agent(app);
        
        const refreshToken = 'token';
        const userSession = { user: { id: 1, email: 'test@example.com' } };
        
        // Setup session dynamically
        await agent.post('/test/session').send(userSession);

        const response = await agent.post('/auth/logout').set('Cookie', `refresh_token=${refreshToken}; connect.sid=session-id`)

        expect(RefreshTokenStore.removeRefreshToken).toHaveBeenCalledWith(userSession.user.id, refreshToken);
        expect(response.status).toBe(204);

        const cookies = response.headers['set-cookie'] as unknown as string[];
        expect(cookies).toBeDefined();
        expect(cookies.length).toBeGreaterThanOrEqual(3);

        const cookieString = cookies.join(';');

        expect(cookieString).toContain('refresh_token=;');
        expect(cookieString).toContain('access_token=;');
        expect(cookieString).toContain('connect.sid=;');
    });

    it('should return 500 if an unexpected error occurs', async () => {
        (RefreshTokenStore.removeRefreshToken as vi.Mock).mockRejectedValue(new Error('internal error'));

        const agent = request.agent(app);

        // Setup session dynamically
        await agent
            .post('/test/session')
            .send({ user: { id: 1, email: 'test@example.com' }, pending2FA: false });

        const response = await agent.post('/auth/logout').set('Cookie', `refresh_token=token; connect.sid=session-id`)

        expect(response.status).toBe(500);
        expect(response.body).toEqual({messages: [{ text:'An unexpected error occurred. Please try again later or contact support.', severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });
});