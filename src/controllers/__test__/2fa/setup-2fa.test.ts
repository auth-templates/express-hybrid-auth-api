import request from 'supertest';
import express from 'express';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import session from 'express-session';
import GlobalConfig from '../../../config.js';
import cookieParser from 'cookie-parser';
import { setup2FA } from '../../2faController.js';
import * as Redis2FA from '../../../lib/redis/redis-2fa.js';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('../../../lib/redis/redis-token.js');
vi.mock('../../../repositories/users.js');

const app = express();
app.use(
	session({
		secret: GlobalConfig.SESSION_SECRET,
		resave: false,
		rolling: true, // This enables automatic touch
		saveUninitialized: false,
		cookie: {
			secure: false, // secure: true requires HTTPS, which is usually off in dev
			httpOnly: true,
			maxAge: GlobalConfig.SESSION_MAX_AGE,
		},
	})
);

app.use(i18nMiddleware);
app.use(express.json());
app.use(cookieParser());

app.post('/test/session', (req, res) => {
	Object.assign(req.session, req.body);
	res.status(200).end();
});

app.post('/2fa/setup', setup2FA);

const twoFASetupData = {
	qrCodeUrl: 'otpauth://totp/MyApp:username@example.com?secret=ABCDEF123456&issuer=MyApp',
	secret: 'ABCDEF123456',
};

describe('POST /2fa/setup', () => {
	beforeAll(async () => {
		await i18nReady;
	});

	it('should return 200 with 2FA setup data', async () => {
		vi.spyOn(Redis2FA, 'get2faSetup').mockResolvedValue(twoFASetupData);

		const agent = request.agent(app);

		const sessionData = { user: { id: 1, email: 'test@example.com' } };
		// Setup session dynamically
		await agent.post('/test/session').send(sessionData);

		const response = await agent
			.post('/2fa/setup')
			.set('Cookie', 'refresh_token=token; access_token=accessstoken; connect.sid=session-id');

		expect(Redis2FA.get2faSetup).toHaveBeenCalledWith(sessionData.user.id, sessionData.user.email);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(twoFASetupData);
	});

	it('should return 500 if an unexpected error occurs', async () => {
		vi.spyOn(Redis2FA, 'get2faSetup').mockRejectedValue(new Error('internal error'));

		const agent = request.agent(app);

		// Setup session dynamically
		await agent.post('/test/session').send({ user: { id: 1, email: 'test@example.com' }, pending2FA: false });

		const response = await agent
			.post('/2fa/setup')
			.set('Cookie', 'refresh_token=token; access_token=accesstoken; connect.sid=session-id');

		expect(response.status).toBe(500);
		expect(response.body).toEqual({
			messages: [
				{ text: 'An unexpected error occurred. Please try again later or contact support.', severity: 'error' },
			],
			code: AppStatusCode.INTERNAL_SERVER_ERROR,
		});
	});
});
