import request from 'supertest';
import express from 'express';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import session from 'express-session';
import GlobalConfig from '../../../config.js';
import cookieParser from 'cookie-parser';
import { verify2FASetup } from '../../2faController.js';
import * as Redis2FA from '../../../lib/redis/redis-2fa.js';
import { UserRepository } from '../../../repositories/users.js';
import { AppStatusCode } from '@/@types/status-code.js';

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

app.post('/2fa/verify-setup', verify2FASetup);

describe('POST /2fa/setup', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    it('should return 200 when with 2FA setup data', async () => {
        const twoStepSecret = "secret";
        jest.spyOn(Redis2FA, 'verify2faSetup').mockResolvedValue(twoStepSecret);
        (UserRepository.verifyAndSaveSecret as jest.Mock).mockResolvedValue(undefined);
        
        const code = "123456";
        const agent = request.agent(app);

        const sessionData = { user: { id: 1, email: 'test@example.com' } };
        // Setup session dynamically
        await agent.post('/test/session').send(sessionData);

        const response = await agent.post('/2fa/verify-setup')
                        
                                    .set('Cookie', 'refresh_token=token; access_token=accesstoken; connect.sid=session-id')
                                                .set('Accept-Language', 'en')
                                    .send({code});
        expect(Redis2FA.verify2faSetup).toHaveBeenCalledWith(sessionData.user.id, code);
        expect(UserRepository.verifyAndSaveSecret).toHaveBeenCalledWith(sessionData.user.id, twoStepSecret);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({messages:[ {text: "Two-factor authentication has been successfully verified.", severity: "info"}], code: AppStatusCode.TWO_FA_SETUP_SUCCESS});
    });

    it('should return 400 if an unexpected error occurs', async () => {
        const twoStepSecret = "secret";
        jest.spyOn(Redis2FA, 'verify2faSetup').mockResolvedValue(twoStepSecret);
        (UserRepository.verifyAndSaveSecret as jest.Mock).mockResolvedValue(undefined);
        
        const code = "12345";
        const agent = request.agent(app);

        const sessionData = { user: { id: 1, email: 'test@example.com' } };
        // Setup session dynamically
        await agent.post('/test/session').send(sessionData);

        const response = await agent.post('/2fa/verify-setup')
                                    .set('Cookie', 'refresh_token=token; access_token=accesstoken; connect.sid=session-id')
                                                .set('Accept-Language', 'en')
                                    .send({code});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text: "The 2FA code must be a 6-digit number.", severity: "error"}]});
    });

    it('should return 500 if an unexpected error occurs', async () => {
        jest.spyOn(Redis2FA, 'verify2faSetup').mockRejectedValue(new Error('internal error'));
        
        const code = "123456";
        const agent = request.agent(app);

        // Setup session dynamically
        await agent
            .post('/test/session')
            .send({ user: { id: 1, email: 'test@example.com' }, pending2FA: false });

        const response = await agent.post('/2fa/verify-setup')
                                    .set('Cookie', 'refresh_token=token; access_token=accesstoken; connect.sid=session-id')
                                                .set('Accept-Language', 'en')
                                    .send({code});

        expect(response.status).toBe(500);
        expect(response.body).toEqual({messages: [{text: 'An unexpected error occurred. Please try again later or contact support.', severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });
})
