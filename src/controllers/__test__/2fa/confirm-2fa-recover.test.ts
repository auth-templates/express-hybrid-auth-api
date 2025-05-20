import request from 'supertest';
import express from 'express';
import { confirm2FARecover } from '../../2faController';
import { AppError } from '../../../lib/error';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n';
import { UserRepository } from '../../../repositories/users';
import session from 'express-session';
import GlobalConfig from '../../../config';
import { VerificationTokensRepository } from '../../../repositories/verification-tokens';
import * as emailService from '../../../lib/mailer';

jest.mock('../../../lib/redis/redis-token');
jest.mock('../../../repositories/users');
jest.mock('../../../repositories/verification-tokens');

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
app.post('/2fa/confirm-recover', confirm2FARecover);

describe('POST /2fa/confirm-recover', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    it('should return 204 when 2FA token is valid', async () => {
        const userId = 10;
        jest.spyOn(VerificationTokensRepository, 'verify2FAToken').mockResolvedValue({userId});
        (UserRepository.disable2FA as jest.Mock).mockResolvedValue(undefined);
        jest.spyOn(emailService, 'send2FADisabledEmail').mockResolvedValue(undefined);

        const token = "ijklmnopqrstuvwxyz0123"
        const response = await request(app)
                .post('/2fa/confirm-recover')
                .set('Accept-Language', 'en')
                .send({ token });

        expect(response.status).toBe(204);
        expect(UserRepository.disable2FA).toHaveBeenCalledWith(userId);
        expect(VerificationTokensRepository.verify2FAToken).toHaveBeenCalledWith(token);
    });

    it('should return 400 when token is invalid', async () => {
        const userId = 10;
        jest.spyOn(VerificationTokensRepository, 'verify2FAToken').mockRejectedValue(new AppError('tokens.2fa.invalid', {}, 400));

        const token = "invalid-token"
        const response = await request(app).post('/2fa/confirm-recover').set('Accept-Language', 'en').send({ token });

        expect(VerificationTokensRepository.verify2FAToken).toHaveBeenCalledWith(token);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "The two-step verification recovery link is invalid or no longer available. Please request a new link to recover your account." });
    });

    it('should return 400 when token is invalid', async () => {
        const userId = 10;
        jest.spyOn(VerificationTokensRepository, 'verify2FAToken').mockRejectedValue(new AppError('tokens.2fa.expired', {}, 400));

        const token = "expired-token"
        const response = await request(app).post('/2fa/confirm-recover').set('Accept-Language', 'en').send({ token });

        expect(VerificationTokensRepository.verify2FAToken).toHaveBeenCalledWith(token);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Your two-step verification recovery link has expired. Please start the recovery process again to regain access to your account." });
    });

    it('should return 400 when token is invalid', async () => {
        const userId = 10;
        jest.spyOn(VerificationTokensRepository, 'verify2FAToken').mockRejectedValue(new AppError('tokens.2fa.invalid', {}, 400));

        const token = "token-used"
        const response = await request(app).post('/2fa/confirm-recover').set('Accept-Language', 'en').send({ token });

        expect(VerificationTokensRepository.verify2FAToken).toHaveBeenCalledWith(token);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "The two-step verification recovery link is invalid or no longer available. Please request a new link to recover your account." });
    });

    it('should return 500 for internal errors', async () => {
        const userId = 10;
        jest.spyOn(VerificationTokensRepository, 'verify2FAToken').mockResolvedValue({userId});
        (UserRepository.disable2FA as jest.Mock).mockRejectedValue(new AppError('errors.internal', {}, 500));

        const token = "token-used"
        const response = await request(app).post('/2fa/confirm-recover').set('Accept-Language', 'en').send({ token });

        expect(VerificationTokensRepository.verify2FAToken).toHaveBeenCalledWith(token);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "An unexpected error occurred. Please try again later or contact support." });
    });
})
