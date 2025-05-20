import request from 'supertest';
import express from 'express';
import { recover2FA } from '../../2faController';
import { AppError } from '../../../lib/error';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n';
import { UserRepository } from '../../../repositories/users';
import session from 'express-session';
import GlobalConfig from '../../../config';
import { VerificationTokensRepository } from '../../../repositories/verification-tokens';
import * as emailService from '../../../lib/mailer';
import * as Token from '../../../lib/token';
import { UserStatus } from '../../../models/user';

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
app.post('/2fa/recover', recover2FA);

const validUser2FA = {
    id: 2,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: 'admin',
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
        jest.useFakeTimers({ legacyFakeTimers: false });
        jest.setSystemTime(fakeTime);

        (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue(validUser2FA);
        jest.spyOn(VerificationTokensRepository, 'createToken').mockResolvedValue(undefined);
        jest.spyOn(emailService, 'send2FARecoverEmail').mockResolvedValue(undefined);
        jest.spyOn(Token, 'generateToken').mockResolvedValue({
            token: "ijklmnopqrstuvwxyz0123",
            tokenFingerprint: "ff4a9bd4ac116633d2c22443d3eec36d1715a3eefabc150a36a6bcf6bacab1e5",
            hashedToken: "$argon2id$v=19$m=19456,t=2,p=1$+PT78sDEcPVtQBXtn/MGfw$qaximLFDb28eyAGOLygHNvX5aKu0lVdf0doxCQ3xIjo"
        });

        const userEmail = "user@mail.com"
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

        jest.useRealTimers();
    });

    it('should return 200 when user status is not active', async () => {
        (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue({validUser2FA, status: UserStatus.Deactivated});
        jest.spyOn(VerificationTokensRepository, 'createToken').mockRejectedValue(new AppError('errors.2fa_recovery_not_allowed', {}, 200));

        const userEmail = "user@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Two-step verification recovery could not be initiated. Please contact support if the issue persists." });
    });

    it('should return 200 when user does not have 2FA activated', async () => {
        (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue({validUser2FA, enabled2FA: false});
        jest.spyOn(VerificationTokensRepository, 'createToken').mockRejectedValue(new AppError('errors.2fa_recovery_not_allowed', {}, 200));

        const userEmail = "user@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Two-step verification recovery could not be initiated. Please contact support if the issue persists." });
    });

    it('should return 404 for user\'s email is not found in database', async () => {
        (UserRepository.getUserByEmail as jest.Mock).mockRejectedValue(new AppError('errors.user_email_not_found', {}, 404));
            

        const userEmail = "user@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "No user found with the provided email address." });
    });
    
    it('should return 404 if user id is not found when saving the token in database', async () => {
        (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue(validUser2FA);
        jest.spyOn(VerificationTokensRepository, 'createToken').mockRejectedValue(new AppError('errors.user_not_found', {}, 404));

        const userEmail = "user@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "User not found." });
    });


    it('should return 500 for internal errors', async () => {
        (UserRepository.getUserByEmail as jest.Mock).mockRejectedValue(new Error('Unexpected failure'));

        const userEmail = "user@mail.com"
        const response = await request(app).post('/2fa/recover').set('Accept-Language', 'en').send({ userEmail });


        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "An unexpected error occurred. Please try again later or contact support." });
    });
})
