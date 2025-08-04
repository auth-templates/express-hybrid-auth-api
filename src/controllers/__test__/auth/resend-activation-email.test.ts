import request from 'supertest';
import express from 'express';
import { resendActivationEmail } from '../../authController.js';
import { AppError } from '../../../lib/error.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import { UserRepository } from '../../../repositories/users.js';
import session from 'express-session';
import GlobalConfig from '../../../config.js';
import { VerificationTokensRepository } from '../../../repositories/verification-tokens.js';
import * as emailService from '../../../lib/mailer.js';
import * as Token from '../../../lib/token.js';
import { UserStatus } from '../../../models/user.js';
import { AppStatusCode } from '@/@types/status-code.js';

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
app.post('/auth/resend-activation-email', resendActivationEmail);

const validUser = {
    id: 2,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: 'admin',
    createdAt: new Date(),
    enabled2FA: false,
    status: UserStatus.Pending
};

describe('POST /auth/resend-activation-email', () => {
    beforeAll(async () => {
        await i18nReady;
    });
    
    it('should return 204 when reset password email is sent', async () => {
        const fakeTime = new Date('2025-05-15T00:00:00Z');
        jest.useFakeTimers({ legacyFakeTimers: false });
        jest.setSystemTime(fakeTime);

        const token = "ijklmnopqrstuvwxyz0123";
        (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue(validUser);
        jest.spyOn(VerificationTokensRepository, 'createToken').mockResolvedValue(undefined);
        jest.spyOn(emailService, 'sendVerificationEmail').mockResolvedValue(undefined);
        jest.spyOn(Token, 'generateToken').mockResolvedValue({
            token: token,
            tokenFingerprint: "ff4a9bd4ac116633d2c22443d3eec36d1715a3eefabc150a36a6bcf6bacab1e5",
            hashedToken: "$argon2id$v=19$m=19456,t=2,p=1$+PT78sDEcPVtQBXtn/MGfw$qaximLFDb28eyAGOLygHNvX5aKu0lVdf0doxCQ3xIjo"
        });

        const userEmail = "dev@mail.com"
        const response = await request(app).post('/auth/resend-activation-email').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(204);
        expect(UserRepository.getUserByEmail).toHaveBeenCalledWith(userEmail);
        expect(VerificationTokensRepository.createToken).toHaveBeenCalledWith({
            expiresAt: new Date("2025-05-15T00:30:00.000Z"),
            tokenFingerprint: "ff4a9bd4ac116633d2c22443d3eec36d1715a3eefabc150a36a6bcf6bacab1e5",
            tokenHash: "$argon2id$v=19$m=19456,t=2,p=1$+PT78sDEcPVtQBXtn/MGfw$qaximLFDb28eyAGOLygHNvX5aKu0lVdf0doxCQ3xIjo",
            type: "signup",
            userId: 2
        });
        expect(emailService.sendVerificationEmail).toHaveBeenCalledWith({t: expect.anything(), 
            userEmail, 
            expiresInMinutes: 30, 
            token: token 
        });

        jest.useRealTimers();
    });

    it('should return 200 when user status is not active', async () => {
        (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue({validUser2FA: validUser, status: UserStatus.Deactivated});
        const userEmail = "dev@mail.com"
        const response = await request(app).post('/auth/resend-activation-email').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ messages:[{text:"If your email still needs to be verified, a confirmation link has been sent.",  severity: "info"}], code: AppStatusCode.CONFIRMATION_EMAIL_SENT_IF_NEEDED});
    });

    it('should return 401 with generic message when user is not found in the database', async () => {
        (UserRepository.getUserByEmail as jest.Mock).mockRejectedValue(new AppError('errors.user_email_not_found', {}, AppStatusCode.USER_NOT_FOUND, 404));
            

        const userEmail = "dev@mail.com"
        const response = await request(app).post('/auth/resend-activation-email').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ messages:[{text:"Failed to send the verification email. Please try again later or contact support.", severity: "error"}], code: AppStatusCode.EMAIL_VERIFICATION_SEND_FAILED});
    });
    
    it('should return 401 with generic message when user is not found when saving the token in database', async () => {
        (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue(validUser);
        jest.spyOn(VerificationTokensRepository, 'createToken').mockRejectedValue(new AppError('errors.user_not_found', {}, AppStatusCode.USER_NOT_FOUND, 404));

        const userEmail = "dev@mail.com"
        const response = await request(app).post('/auth/resend-activation-email').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ messages: [{text: "Failed to send the verification email. Please try again later or contact support.", severity: "error"}], code: AppStatusCode.EMAIL_VERIFICATION_SEND_FAILED});
    });

    it('should return 500 for internal errors', async () => {
        (UserRepository.getUserByEmail as jest.Mock).mockRejectedValue(new Error('Unexpected failure'));

        const userEmail = "dev@mail.com"
        const response = await request(app).post('/auth/resend-activation-email').set('Accept-Language', 'en').send({ userEmail });


        expect(response.status).toBe(500);
        expect(response.body).toEqual({ messages: [{text: "An unexpected error occurred. Please try again later or contact support.", severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });
});
