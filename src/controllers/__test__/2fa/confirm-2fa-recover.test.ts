import request from 'supertest';
import express from 'express';
import { confirm2FARecover } from '../../2faController.js';
import { AppError } from '../../../lib/error.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import { UserRepository } from '../../../repositories/users.js';
import session from 'express-session';
import GlobalConfig from '../../../config.js';
import { VerificationTokensRepository } from '../../../repositories/verification-tokens.js';
import * as emailService from '../../../lib/mailer.js';
import { Role, UserStatus } from '../../../models/user.js';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('../../../lib/redis/redis-token.js');
vi.mock('../../../repositories/users.js');
vi.mock('../../../repositories/verification-tokens.js');

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

const validUser = {
    id: 10,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: Role.Admin,
    createdAt: new Date(),
    enabled2FA: false,
    status: UserStatus.Active
};

describe('POST /2fa/confirm-recover', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    it('should return 204 when 2FA token is valid', async () => {
        vi.spyOn(VerificationTokensRepository, 'verify2FAToken').mockResolvedValue({userId: validUser.id});
        
        vi.mocked(UserRepository.disable2FA).mockResolvedValue(undefined);
        vi.mocked(UserRepository.getUserById).mockResolvedValue(validUser);
        vi.spyOn(emailService, 'send2FADisabledEmail').mockResolvedValue(undefined);

        const token = "ijklmnopqrstuvwxyz0123"
        const response = await request(app)
                .post('/2fa/confirm-recover')
                .set('Accept-Language', 'en')
                .send({ token });

        expect(response.status).toBe(204);
        expect(UserRepository.disable2FA).toHaveBeenCalledWith(validUser.id);
        expect(VerificationTokensRepository.verify2FAToken).toHaveBeenCalledWith(token);
        expect(UserRepository.getUserById).toHaveBeenCalledWith(validUser.id);
        expect(emailService.send2FADisabledEmail).toHaveBeenCalledWith({t: expect.anything(), userEmail: validUser.email });
    });

    it('should return 400 when token is invalid', async () => {
        const userId = 10;
        vi.spyOn(VerificationTokensRepository, 'verify2FAToken').mockRejectedValue(new AppError('tokens.2fa.invalid', {}, AppStatusCode.TWO_FA_RECOVERY_TOKEN_INVALID, 400));

        const token = "invalid-token"
        const response = await request(app).post('/2fa/confirm-recover').set('Accept-Language', 'en').send({ token });

        expect(VerificationTokensRepository.verify2FAToken).toHaveBeenCalledWith(token);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ messages: [{ text: "The two-step verification recovery link is invalid or no longer available. Please request a new link to recover your account.", severity: 'error' }], code: AppStatusCode.TWO_FA_RECOVERY_TOKEN_INVALID});
    });

    it('should return 400 when token is invalid', async () => {
        const userId = 10;
        vi.spyOn(VerificationTokensRepository, 'verify2FAToken').mockRejectedValue(new AppError('tokens.2fa.expired', {}, AppStatusCode.TWO_FA_RECOVERY_TOKEN_EXPIRED, 400));

        const token = "expired-token"
        const response = await request(app).post('/2fa/confirm-recover').set('Accept-Language', 'en').send({ token });

        expect(VerificationTokensRepository.verify2FAToken).toHaveBeenCalledWith(token);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ messages: [{text:"Your two-step verification recovery link has expired. Please start the recovery process again to regain access to your account.", severity: 'error' }], code: AppStatusCode.TWO_FA_RECOVERY_TOKEN_EXPIRED});
    });

    it('should return 400 when token is already used', async () => {
        const userId = 10;
        vi.spyOn(VerificationTokensRepository, 'verify2FAToken').mockRejectedValue(new AppError('tokens.2fa.already_used', {}, AppStatusCode.TWO_FA_RECOVERY_TOKEN_ALREADY_USED, 400));

        const token = "token-used"
        const response = await request(app).post('/2fa/confirm-recover').set('Accept-Language', 'en').send({ token });

        expect(VerificationTokensRepository.verify2FAToken).toHaveBeenCalledWith(token);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ messages: [{text:"This two-step verification recovery link has already been used. If you still need access, request a new recovery link.", severity: "error"}], code: AppStatusCode.TWO_FA_RECOVERY_TOKEN_ALREADY_USED});
    });

    it('should return 500 for internal errors', async () => {
        const userId = 10;
        vi.spyOn(VerificationTokensRepository, 'verify2FAToken').mockResolvedValue({userId});
        vi.mocked(UserRepository.disable2FA).mockRejectedValue(new AppError('errors.internal', {},  AppStatusCode.INTERNAL_SERVER_ERROR, 500));

        const token = "token-used"
        const response = await request(app).post('/2fa/confirm-recover').set('Accept-Language', 'en').send({ token });

        expect(VerificationTokensRepository.verify2FAToken).toHaveBeenCalledWith(token);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ messages: [{ text:"An unexpected error occurred. Please try again later or contact support.", severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });
})
