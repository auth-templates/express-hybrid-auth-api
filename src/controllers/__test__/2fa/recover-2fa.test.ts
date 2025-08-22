import request from 'supertest';
import express from 'express';
import { recover2FA } from '../../2faController.js';
import { AppError } from '../../../lib/error.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import { UserRepository } from '../../../repositories/users.js';
import session from 'express-session';
import GlobalConfig from '../../../config.js';
import { VerificationTokensRepository } from '../../../repositories/verification-tokens.js';
import * as emailService from '../../../lib/mailer.js';
import * as Token from '../../../lib/token.js';
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
app.post('/2fa/recover', recover2FA);

const validUser2FA = {
    id: 2,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: Role.Admin,
    createdAt: new Date(),
    enabled2FA: true,
    status: UserStatus.Active
};

describe('POST /2fa/recover', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    it('should return 204 when 2FA recovery email is sent', async () => {
        const fakeTime = new Date('2025-05-15T00:00:00Z');
        vi.useFakeTimers({ legacyFakeTimers: false });
        vi.setSystemTime(fakeTime);

        const token = "ijklmnopqrstuvwxyz0123";
        (UserRepository.getUserByEmail as vi.Mock).mockResolvedValue(validUser2FA);
        vi.spyOn(VerificationTokensRepository, 'createToken').mockResolvedValue(undefined);
        vi.spyOn(emailService, 'send2FARecoverEmail').mockResolvedValue(undefined);
        vi.spyOn(Token, 'generateToken').mockResolvedValue({
            token,
            tokenFingerprint: "ff4a9bd4ac116633d2c22443d3eec36d1715a3eefabc150a36a6bcf6bacab1e5",
            hashedToken: "$argon2id$v=19$m=19456,t=2,p=1$+PT78sDEcPVtQBXtn/MGfw$qaximLFDb28eyAGOLygHNvX5aKu0lVdf0doxCQ3xIjo"
        });

        const userEmail = "dev@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(204);
        expect(UserRepository.getUserByEmail).toHaveBeenCalledWith(userEmail);
        expect(VerificationTokensRepository.createToken).toHaveBeenCalledWith({
            expiresAt: new Date("2025-05-15T00:30:00.000Z"),
            tokenFingerprint: "ff4a9bd4ac116633d2c22443d3eec36d1715a3eefabc150a36a6bcf6bacab1e5",
            tokenHash: "$argon2id$v=19$m=19456,t=2,p=1$+PT78sDEcPVtQBXtn/MGfw$qaximLFDb28eyAGOLygHNvX5aKu0lVdf0doxCQ3xIjo",
            type: "twofa",
            userId: 2
        });
        expect(emailService.send2FARecoverEmail).toHaveBeenCalledWith({t: 
            expect.anything(), 
            userEmail: validUser2FA.email,
            expiresInMinutes: 30,
            verificationCode: token,
        });

        vi.useRealTimers();
    });

    it('should return 200 when user status is not active', async () => {
        (UserRepository.getUserByEmail as vi.Mock).mockResolvedValue({validUser2FA, status: UserStatus.Deactivated});

        const userEmail = "user@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ messages: [{ text: "Two-step verification recovery could not be initiated. Please contact support if the issue persists.", severity: "error"}], code: AppStatusCode.TWO_FA_RECOVERY_NOT_INITIATED});
    });

    it('should return 200 when user does not have 2FA activated', async () => {
        (UserRepository.getUserByEmail as vi.Mock).mockResolvedValue({validUser2FA, enabled2FA: false});

        const userEmail = "user@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ messages: [{text: "Two-step verification recovery could not be initiated. Please contact support if the issue persists.", severity: "error"}], code: AppStatusCode.TWO_FA_RECOVERY_NOT_INITIATED});
    });

    it('should return 401 with generic message when user is not found in the database', async () => {
        (UserRepository.getUserByEmail as vi.Mock).mockRejectedValue(new AppError('errors.user_email_not_found', {}, AppStatusCode.USER_NOT_FOUND, 404));
            
        const userEmail = "user@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ messages: [{ text: "Failed to send the two-factor authentication recovery email. Please try again later or contact support.", severity: "error"}], code: AppStatusCode.EMAIL_TWO_FA_RECOVERY_SEND_FAILED});
    });
    
    it('should return 401 with generic message when user is not found when saving the token in database', async () => {
        (UserRepository.getUserByEmail as vi.Mock).mockResolvedValue(validUser2FA);
        vi.spyOn(VerificationTokensRepository, 'createToken').mockRejectedValue(new AppError('errors.user_not_found', {}, AppStatusCode.USER_NOT_FOUND, 404));

        const userEmail = "user@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ messages: [{ text: "Failed to send the two-factor authentication recovery email. Please try again later or contact support.", severity: "error" }], code: AppStatusCode.EMAIL_TWO_FA_RECOVERY_SEND_FAILED});
    });


    it('should return 500 for internal errors', async () => {
        (UserRepository.getUserByEmail as vi.Mock).mockRejectedValue(new Error('Unexpected failure'));

        const userEmail = "user@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });


        expect(response.status).toBe(500);
        expect(response.body).toEqual({ messages: [{ text: "An unexpected error occurred. Please try again later or contact support.", severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });
})
