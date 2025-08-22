import request from 'supertest';
import express from 'express';
import { confirmResetPassword } from '../../authController.js';
import { VerificationTokensRepository } from '../../../repositories/verification-tokens.js';
import { AppError } from '../../../lib/error.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import { UserRepository } from '../../../repositories/users.js';
import * as emailService from '../../../lib/mailer.js';
import { Role, UserStatus } from '../../../models/user.js';
import { hashPassword } from '../../../lib/password.js';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('../../../repositories/verification-tokens.js');
vi.mock('../../../lib/password.js');

const app = express();
app.use(i18nMiddleware);
app.use(express.json());
app.post('/auth/reset-password', confirmResetPassword);

const validUser = {
    id: 2,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: Role.Admin,
    createdAt: new Date(),
    enabled2FA: false,
    status: UserStatus.Active
};

describe('POST /auth/reset-password', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    it('should return 204 for a valid token', async () => {
        (hashPassword as vi.Mock).mockResolvedValue('hashedPassword123');
        (VerificationTokensRepository.verifyPasswordResetToken as vi.Mock).mockResolvedValue({ userId: 1 });
        vi.spyOn(UserRepository, 'getUserById').mockResolvedValue(validUser);
        vi.spyOn(UserRepository, 'updatePassword').mockResolvedValue();
        vi.spyOn(emailService, 'sendPasswordChangedEmail').mockResolvedValue(undefined);

        const response = await request(app)
            .post('/auth/reset-password')
            .send({ password: '$SuperSecurePassword45', token: 'reset-password-valid' });

        expect(response.status).toBe(204);
        expect(VerificationTokensRepository.verifyPasswordResetToken).toHaveBeenCalledWith('reset-password-valid');
        expect(UserRepository.getUserById).toHaveBeenCalledWith(1);
        expect(UserRepository.updatePassword).toHaveBeenCalledWith(1, 'hashedPassword123');
        expect(emailService.sendPasswordChangedEmail).toHaveBeenCalledWith({t: expect.anything(), userEmail: validUser.email});
    });

    it('should return 400 if password is invalid', async () => {
        const response = await request(app).post('/auth/reset-password')
            .set('Accept-Language', 'en')
            .send({ password: '$Suuuuup', token: 'reset-password-valid' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text:'Password must contain at least one digit', severity: "error"}]});
    });

    it('should return 400 for a used token', async () => {
        (VerificationTokensRepository.verifyPasswordResetToken as vi.Mock).mockRejectedValue(
            new AppError('tokens.password-reset.already_used', {}, AppStatusCode.PASSWORD_RESET_TOKEN_ALREADY_USED, 400)
        );

        const response = await request(app).post('/auth/reset-password')
                .set('Accept-Language', 'en')
                .send({ password: '$SuperSecurePassword45', token: 'reset-password-used' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text:'This password reset link has already been used. If you still need to reset your password, request a new link.', severity: "error"}], code: AppStatusCode.PASSWORD_RESET_TOKEN_ALREADY_USED});
    });

    it('should return 400 for an expired token', async () => {
        (VerificationTokensRepository.verifyPasswordResetToken as vi.Mock).mockRejectedValue(
            new AppError('tokens.password-reset.expired', {}, AppStatusCode.PASSWORD_RESET_TOKEN_EXPIRED, 400)
        );

        const response = await request(app).post('/auth/reset-password')
                .set('Accept-Language', 'en')
                .send({ password: '$SuperSecurePassword45', token: 'reset-password-expired' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text:'Your password reset link has expired. Please request a new one to reset your password.', severity: "error"}], code: AppStatusCode.PASSWORD_RESET_TOKEN_EXPIRED});
    });

    it('should return 400 for a non-existent token or invalid token', async () => {
        (VerificationTokensRepository.verifyPasswordResetToken as vi.Mock).mockRejectedValue(
            new AppError('tokens.password-reset.invalid', {}, AppStatusCode.PASSWORD_RESET_TOKEN_INVALID, 400)
        );

        const response = await request(app)
            .post('/auth/reset-password')
            .set('Accept-Language', 'en')
           .send({ password: '$SuperSecurePassword45', token: 'reset-password-expired' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text: 'The password reset link is invalid or no longer available. Please request a new link to reset your password.', severity: "error"}], code: AppStatusCode.PASSWORD_RESET_TOKEN_INVALID});
    });

    it('should return 200 when user status is not active', async () => {
        (VerificationTokensRepository.verifyPasswordResetToken as vi.Mock).mockResolvedValue({ userId: 1 });
        vi.spyOn(UserRepository, 'getUserById').mockResolvedValue({...validUser, status: UserStatus.Deactivated});

        const response = await request(app)
            .post('/auth/reset-password')
            .set('Accept-Language', 'en')
           .send({ password: '$SuperSecurePassword45', token: 'reset-password-expired' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ messages: [{text:"Password reset could not be initiated. Please contact support if the issue persists.", severity: "error" }], code: AppStatusCode.PASSWORD_RESET_NOT_INITIATED});
    });

    it('should return 500 for unexpected error', async () => {
        (VerificationTokensRepository.verifyPasswordResetToken as vi.Mock).mockRejectedValue(
            new Error('Some unexpected DB failure')
        );

         const response = await request(app)
            .post('/auth/reset-password')
            .set('Accept-Language', 'en')
           .send({ password: '$SuperSecurePassword45', token: 'reset-password-valid' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({messages: [{text:'An unexpected error occurred. Please try again later or contact support.', severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });
});
