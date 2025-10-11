import request from 'supertest';
import express from 'express';
import session from 'express-session';
import { validateSession } from '../../authController.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import GlobalConfig from '../../../config.js';
import { RefreshTokenStore } from '../../../lib/redis/redis-token.js';
import cookieParser from 'cookie-parser';
import { AppError } from '../../../lib/error.js';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('../../../lib/redis/redis-token.js');

const app = express();

app.use(
	session({
		secret: GlobalConfig.SESSION_SECRET,
		resave: false,
		rolling: true,
		saveUninitialized: false,
		cookie: {
			secure: false,
			httpOnly: true,
			maxAge: GlobalConfig.SESSION_MAX_AGE,
		},
	})
);

app.use(i18nMiddleware);
app.use(express.json());
app.use(cookieParser());

// Helper endpoint to set session data for testing
app.post('/test/session', (req, res) => {
	Object.assign(req.session, req.body);
	res.status(200).end();
});

// Wrap the handler to use in express
app.get('/auth/validate-session', validateSession);

describe('GET /auth/validate-session', () => {
	beforeAll(async () => {
		await i18nReady;
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return valid: true when session and refresh token are valid', async () => {
		const validRefreshToken = 'valid-refresh-token';
		vi.mocked(RefreshTokenStore.getStoredRefreshToken).mockResolvedValue(validRefreshToken);

		const agent = request.agent(app);

		// Setup session with user data
		await agent.post('/test/session').send({
			user: { id: 1, email: 'test@example.com' },
			pending2FA: false,
			termsAccepted: true,
		});

		const response = await agent
			.get('/auth/validate-session')
			.set('Cookie', `refresh_token=${validRefreshToken}`)
			.set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: true });
		expect(RefreshTokenStore.getStoredRefreshToken).toHaveBeenCalledWith(1, validRefreshToken);
	});

	it('should return valid: false when no session exists', async () => {
		const response = await request(app).get('/auth/validate-session').set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: false });
		expect(RefreshTokenStore.getStoredRefreshToken).not.toHaveBeenCalled();
	});

	it('should return valid: false when session exists but no user data', async () => {
		const agent = request.agent(app);

		// Setup session without user data
		await agent.post('/test/session').send({
			pending2FA: false,
			termsAccepted: true,
		});

		const response = await agent.get('/auth/validate-session').set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: false });
		expect(RefreshTokenStore.getStoredRefreshToken).not.toHaveBeenCalled();
	});

	it('should return valid: false when session exists but no refresh token cookie', async () => {
		const agent = request.agent(app);

		// Setup session with user data
		await agent.post('/test/session').send({
			user: { id: 1, email: 'test@example.com' },
			pending2FA: false,
			termsAccepted: true,
		});

		const response = await agent.get('/auth/validate-session').set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: false });
		expect(RefreshTokenStore.getStoredRefreshToken).not.toHaveBeenCalled();
	});

	it('should return valid: false when refresh token does not match stored token', async () => {
		const refreshToken = 'invalid-refresh-token';
		const storedToken = 'different-stored-token';
		vi.mocked(RefreshTokenStore.getStoredRefreshToken).mockResolvedValue(storedToken);

		const agent = request.agent(app);

		// Setup session with user data
		await agent.post('/test/session').send({
			user: { id: 1, email: 'test@example.com' },
			pending2FA: false,
			termsAccepted: true,
		});

		const response = await agent
			.get('/auth/validate-session')
			.set('Cookie', `refresh_token=${refreshToken}`)
			.set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: false });
		expect(RefreshTokenStore.getStoredRefreshToken).toHaveBeenCalledWith(1, refreshToken);
	});

	it('should return valid: false when refresh token is not found in Redis', async () => {
		const refreshToken = 'non-existent-token';
		vi.mocked(RefreshTokenStore.getStoredRefreshToken).mockResolvedValue('');

		const agent = request.agent(app);

		// Setup session with user data
		await agent.post('/test/session').send({
			user: { id: 1, email: 'test@example.com' },
			pending2FA: false,
			termsAccepted: true,
		});

		const response = await agent
			.get('/auth/validate-session')
			.set('Cookie', `refresh_token=${refreshToken}`)
			.set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: false });
		expect(RefreshTokenStore.getStoredRefreshToken).toHaveBeenCalledWith(1, refreshToken);
	});

	it('should return valid: false when refresh token is null from Redis', async () => {
		const refreshToken = 'null-token';
		vi.mocked(RefreshTokenStore.getStoredRefreshToken).mockResolvedValue(null as any);

		const agent = request.agent(app);

		// Setup session with user data
		await agent.post('/test/session').send({
			user: { id: 1, email: 'test@example.com' },
			pending2FA: false,
			termsAccepted: true,
		});

		const response = await agent
			.get('/auth/validate-session')
			.set('Cookie', `refresh_token=${refreshToken}`)
			.set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: false });
		expect(RefreshTokenStore.getStoredRefreshToken).toHaveBeenCalledWith(1, refreshToken);
	});

	it('should return valid: true when refresh token matches stored token exactly', async () => {
		const refreshToken = 'exact-match-token';
		vi.mocked(RefreshTokenStore.getStoredRefreshToken).mockResolvedValue(refreshToken);

		const agent = request.agent(app);

		// Setup session with user data
		await agent.post('/test/session').send({
			user: { id: 1, email: 'test@example.com' },
			pending2FA: false,
			termsAccepted: true,
		});

		const response = await agent
			.get('/auth/validate-session')
			.set('Cookie', `refresh_token=${refreshToken}`)
			.set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: true });
		expect(RefreshTokenStore.getStoredRefreshToken).toHaveBeenCalledWith(1, refreshToken);
	});

	it('should return valid: false when Redis throws an error', async () => {
		const refreshToken = 'error-token';
		vi.mocked(RefreshTokenStore.getStoredRefreshToken).mockRejectedValue(new Error('Redis connection error'));

		const agent = request.agent(app);

		// Setup session with user data
		await agent.post('/test/session').send({
			user: { id: 1, email: 'test@example.com' },
			pending2FA: false,
			termsAccepted: true,
		});

		const response = await agent
			.get('/auth/validate-session')
			.set('Cookie', `refresh_token=${refreshToken}`)
			.set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: false });
		expect(RefreshTokenStore.getStoredRefreshToken).toHaveBeenCalledWith(1, refreshToken);
	});

	it('should return valid: false when AppError is thrown', async () => {
		const refreshToken = 'app-error-token';
		const appError = new AppError('errors.redis_error', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
		vi.mocked(RefreshTokenStore.getStoredRefreshToken).mockRejectedValue(appError);

		const agent = request.agent(app);

		// Setup session with user data
		await agent.post('/test/session').send({
			user: { id: 1, email: 'test@example.com' },
			pending2FA: false,
			termsAccepted: true,
		});

		const response = await agent
			.get('/auth/validate-session')
			.set('Cookie', `refresh_token=${refreshToken}`)
			.set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: false });
		expect(RefreshTokenStore.getStoredRefreshToken).toHaveBeenCalledWith(1, refreshToken);
	});

	it('should handle session with different user IDs correctly', async () => {
		const refreshToken = 'user-2-token';
		vi.mocked(RefreshTokenStore.getStoredRefreshToken).mockResolvedValue(refreshToken);

		const agent = request.agent(app);

		// Setup session with different user ID
		await agent.post('/test/session').send({
			user: { id: 2, email: 'user2@example.com' },
			pending2FA: true,
			termsAccepted: false,
		});

		const response = await agent
			.get('/auth/validate-session')
			.set('Cookie', `refresh_token=${refreshToken}`)
			.set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: true });
		expect(RefreshTokenStore.getStoredRefreshToken).toHaveBeenCalledWith(2, refreshToken);
	});

	it('should handle session with minimal user data', async () => {
		const refreshToken = 'minimal-token';
		vi.mocked(RefreshTokenStore.getStoredRefreshToken).mockResolvedValue(refreshToken);

		const agent = request.agent(app);

		// Setup session with minimal user data
		await agent.post('/test/session').send({
			user: { id: 3 },
		});

		const response = await agent
			.get('/auth/validate-session')
			.set('Cookie', `refresh_token=${refreshToken}`)
			.set('Accept-Language', 'en');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ valid: true });
		expect(RefreshTokenStore.getStoredRefreshToken).toHaveBeenCalledWith(3, refreshToken);
	});
});
