import request from 'supertest';
import express from 'express';
import { login } from '../../authController';
import { AppError } from '../../../lib/error';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n';
import { UserRepository } from '../../../repositories/users';
import session from 'express-session';
import GlobalConfig from '../../../config';
import { RefreshTokenStore } from '../../../lib/redis/redis-token';
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
app.post('/auth/login', login);

const validUser = {
    id: 1,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: 'admin',
    createdAt: new Date(),
};

const validUser2FA = {
    id: 2,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: 'admin',
    createdAt: new Date(),
    enabled2FA: true
};

describe('POST /auth/login', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    it('should set refresh_token, access_token, and connect.sid cookies', async () => {
        (UserRepository.login as jest.Mock).mockResolvedValue(validUser);
        (RefreshTokenStore.storeRefreshToken as jest.Mock).mockResolvedValue(undefined);
        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({
                email: 'dev@mail.com',
                password: '$SuperSecurePassword45',
            });

        const cookies = response.headers['set-cookie'] as unknown as string[];
        expect(cookies).toBeDefined();
        expect(cookies.length).toBeGreaterThanOrEqual(3);

        const cookieString = cookies.join(';');
        expect(cookieString).toContain('refresh_token=');
        expect(cookieString).toContain('access_token=');
        expect(cookieString).toContain('connect.sid=');
    });

    it('should set correct 2FA user jwt access token payload', async () => {
        const fakeTime = new Date('2025-05-15T00:00:00Z');
        jest.useFakeTimers({ legacyFakeTimers: false });
        jest.setSystemTime(fakeTime);

        (UserRepository.login as jest.Mock).mockResolvedValue(validUser2FA);
        (RefreshTokenStore.storeRefreshToken as jest.Mock).mockResolvedValue(undefined);
        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({
                email: 'dev@mail.com',
                password: '$SuperSecurePassword45',
            });

        const cookies = response.headers['set-cookie'] as unknown as string[];
        expect(cookies).toBeDefined();
        expect(cookies.length).toBeGreaterThanOrEqual(3);
        
        const accessTokenCookie = cookies.filter(x => x.startsWith("access_token="))[0];
        const tokenMatch  = accessTokenCookie!.match(/access_token=([^;]+)/);
        const accessToken = tokenMatch?.[1];
        expect(accessToken).toBeDefined();

        const decoded = jwt.decode(accessToken!) as jwt.JwtPayload;

        expect(decoded).toHaveProperty('userId', 2);
        expect(decoded).toHaveProperty('pending2FA', true);
        expect(decoded).toHaveProperty('exp', fakeTime.getTime()/1000 + GlobalConfig.ACCESS_TOKEN_MAX_AGE);
        expect(decoded).toHaveProperty('iat', fakeTime.getTime()/1000);

        jest.useRealTimers();
    });

    it('should return 200 and user data for valid credentials', async () => {
        (UserRepository.login as jest.Mock).mockResolvedValue(validUser);
        (RefreshTokenStore.storeRefreshToken as jest.Mock).mockResolvedValue(undefined);
        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({
                email: 'dev@mail.com',
                password: '$SuperSecurePassword45',
            });

        expect(response.status).toBe(200);
        expect(response.body.email).toBe('dev@mail.com');
    });

    it('should return 400 for invalid email format', async () => {
        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({
                email: 'dev.mail.com',
                password: '$SuperSecurePassword45',
            });

        expect(response.status).toBe(400);
        expect(response.body[0]).toMatch("Invalid email address");
    });

    it('should return 400 for missing fields', async () => {
        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body[0]).toMatch("Invalid email or password. Please try again.");
    });

    it('should return 400 for invalid credentials (wrong password but valid)', async () => {
        (UserRepository.login as jest.Mock).mockRejectedValue(
            new AppError('errors.invalid_credentials', {}, 400)
        );

        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({
                email: 'dev@mail.com',
                password: '$SuperSecurePassword46',
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toMatch("Invalid email or password. Please try again.");
    });

    it('should return 500 for internal errors', async () => {
        (UserRepository.login as jest.Mock).mockRejectedValue(new Error('Unexpected failure'));

        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({
                email: 'dev@mail.com',
                password: '$SuperSecurePassword45',
            });

        expect(response.status).toBe(500);
        expect(response.body.message).toMatch("An unexpected error occurred. Please try again later or contact support.");
    });
})
