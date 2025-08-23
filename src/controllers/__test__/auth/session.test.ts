import request from 'supertest';
import express from 'express';
import session from 'express-session';
import { UserRepository } from '../../../repositories/users.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import GlobalConfig from '../../../config.js';
import { getSession } from '../../authController.js';
import { AppError } from '../../../lib/error.js';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('../../../repositories/users.js');

const app = express();

app.use(session({
  secret: GlobalConfig.SESSION_SECRET,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: GlobalConfig.SESSION_MAX_AGE,
  },
}));

app.use(i18nMiddleware);
app.use(express.json());

app.post('/test/session', (req, res) => {
    Object.assign(req.session, req.body);
    res.status(200).end();
});

// Wrap the handler to use in express
app.get('/auth/session', getSession);

const validUser = {
  id: 1,
  firstName: 'Dev',
  lastName: 'Tester',
  email: 'dev@mail.com',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

describe('GET /auth/session', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    it('should return 200 and user data when session user id is valid', async () => {
        vi.mocked(UserRepository.getUserById).mockResolvedValue(validUser as any);

        const agent = request.agent(app);

        await agent
            .post('/test/session')
            .send({ user: { id: 1, email: 'dev@mail.com' }, pending2FA: false, termsAccepted: true });

        const response = await agent.get('/auth/session').set('Accept-Language', 'en');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({user: validUser});
    });

    it('should return AppError status code and translation message', async () => {
        const appError = new AppError('errors.user_not_found', {}, AppStatusCode.USER_NOT_FOUND, 404);
        vi.mocked(UserRepository.getUserById).mockRejectedValue(appError);

        const response = await request(app).get('/auth/session').set('Accept-Language', 'en');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({messages:[{text: "User not found.", severity: "error"}], code: AppStatusCode.USER_NOT_FOUND});
    });

    it('should return 500 with generic message if unknown error thrown', async () => {
        vi.mocked(UserRepository.getUserById).mockRejectedValue(new Error('Unexpected failure'));

        const response = await request(app).get('/auth/session').set('Accept-Language', 'en');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({messages:[{text: "An unexpected error occurred. Please try again later or contact support.", severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });
});
