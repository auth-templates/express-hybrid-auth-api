import request from 'supertest';
import express from 'express';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n';
import session from 'express-session';
import GlobalConfig from '../../../config';
import cookieParser from 'cookie-parser';
import { disable2FA } from '../../2faController';
import { UserRepository } from '../../../repositories/users';

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

app.post('/2fa/disable', disable2FA);

describe('POST /2fa/disable', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    it('should return 204 when 2FA is successfully disabled', async () => {
        (UserRepository.disable2FA as jest.Mock).mockResolvedValue(undefined);

        const agent = request.agent(app);
        await agent.get('/test-login');

        const sessionData = { user: { id: 1, email: 'test@example.com' } };
        // Setup session dynamically
        await agent.post('/test/session').send(sessionData);

        const response = await agent.post('/2fa/disable').set('Cookie', 'refreshToken=token; accessToken=access_token; connect.sid=session-id')
    
        expect(response.status).toBe(204);
        expect(UserRepository.disable2FA).toHaveBeenCalledWith(sessionData.user.id);
    });

    it('should return 500 if an unexpected error occurs', async () => {
        (UserRepository.disable2FA as jest.Mock).mockRejectedValue(new Error('internal error'));

        const agent = request.agent(app);
        await agent.get('/test-login');
 
         // Setup session dynamically
        await agent
             .post('/test/session')
             .send({ user: { id: 1, email: 'test@example.com' }, pending2FA: false });
 
        const response = await agent.post('/2fa/disable').set('Cookie', 'refreshToken=token; accessToken=accesss_token; connect.sid=session-id')
 
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('An unexpected error occurred. Please try again later or contact support.');
    });
});