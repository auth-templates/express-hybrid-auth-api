import request from 'supertest';
import express from 'express';
import { confirmResetPassword } from '../../authController';
import { VerificationTokensRepository } from '../../../repositories/verification-tokens';
import { AppError } from '../../../lib/error';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n';
import { UserRepository } from '../../../repositories/users';
import * as emailService from '../../../lib/mailer';
import { Role, UserStatus } from '../../../models/user';
import { hashPassword } from '../../../lib/password';

jest.mock('../../../repositories/verification-tokens');
jest.mock('../../../lib/password');

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
        (hashPassword as jest.Mock).mockResolvedValue('hashedPassword123');
        (VerificationTokensRepository.verifyPasswordResetToken as jest.Mock).mockResolvedValue({ userId: 1 });
        jest.spyOn(UserRepository, 'getUserById').mockResolvedValue(validUser);
        jest.spyOn(UserRepository, 'updatePassword').mockResolvedValue();
        jest.spyOn(emailService, 'sendPasswordChangedEmail').mockResolvedValue(undefined);

        const response = await request(app)
            .post('/auth/reset-password')
            .send({ password: '$SuperSecurePassword45', token: 'reset-password-valid' });

        expect(response.status).toBe(204);
        expect(VerificationTokensRepository.verifyPasswordResetToken).toHaveBeenCalledWith('reset-password-valid');
        expect(UserRepository.getUserById).toHaveBeenCalledWith(1);
        expect(UserRepository.updatePassword).toHaveBeenCalledWith(1, 'hashedPassword123');
    });

    it('should return 400 if password is invalid', async () => {
        const response = await request(app).post('/auth/reset-password')
            .set('Accept-Language', 'en')
            .send({ password: '$Suuuuup', token: 'reset-password-valid' });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(['Password must contain at least one digit']);
    });

    it('should return 400 for a used token', async () => {
        (VerificationTokensRepository.verifyPasswordResetToken as jest.Mock).mockRejectedValue(
            new AppError('tokens.password-reset.used', {}, 400)
        );

        const response = await request(app).post('/auth/reset-password')
                .set('Accept-Language', 'en')
                .send({ password: '$SuperSecurePassword45', token: 'reset-password-used' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('This password reset link has already been used. If you still need to reset your password, request a new link.');
    });

    it('should return 400 for an expired token', async () => {
        (VerificationTokensRepository.verifyPasswordResetToken as jest.Mock).mockRejectedValue(
            new AppError('tokens.password-reset.expired', {}, 400)
        );

        const response = await request(app).post('/auth/reset-password')
                .set('Accept-Language', 'en')
                .send({ password: '$SuperSecurePassword45', token: 'reset-password-expired' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Your password reset link has expired. Please request a new one to reset your password.');
    });

    it('should return 400 for a non-existent token or invalid token', async () => {
        (VerificationTokensRepository.verifyPasswordResetToken as jest.Mock).mockRejectedValue(
            new AppError('tokens.password-reset.invalid', {}, 400)
        );

        const response = await request(app)
            .post('/auth/reset-password')
            .set('Accept-Language', 'en')
           .send({ password: '$SuperSecurePassword45', token: 'reset-password-expired' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('The password reset link is invalid or no longer available. Please request a new link to reset your password.');
    });

    it('should return 200 when user status is not active', async () => {
        (VerificationTokensRepository.verifyPasswordResetToken as jest.Mock).mockResolvedValue({ userId: 1 });
        jest.spyOn(UserRepository, 'getUserById').mockResolvedValue({...validUser, status: UserStatus.Deactivated});

        const response = await request(app)
            .post('/auth/reset-password')
            .set('Accept-Language', 'en')
           .send({ password: '$SuperSecurePassword45', token: 'reset-password-expired' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Password reset could not be initiated. Please contact support if the issue persists." });
    });

    it('should return 500 for unexpected error', async () => {
        (VerificationTokensRepository.verifyPasswordResetToken as jest.Mock).mockRejectedValue(
            new Error('Some unexpected DB failure')
        );

         const response = await request(app)
            .post('/auth/reset-password')
            .set('Accept-Language', 'en')
           .send({ password: '$SuperSecurePassword45', token: 'reset-password-valid' });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('An unexpected error occurred. Please try again later or contact support.');
    });
});
