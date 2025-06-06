import request from 'supertest';
import express from 'express';
import { verifySignup } from '../../authController';
import { VerificationTokensRepository } from '../../../repositories/verification-tokens';
import { AppError } from '../../../lib/error';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n';
import { UserRepository } from '../../../repositories/users';
import * as emailService from '../../../lib/mailer';
import { Role, UserStatus } from '../../../models/user';

jest.mock('../../../repositories/verification-tokens');

const app = express();
app.use(i18nMiddleware);
app.use(express.json());
app.post('/auth/verify-signup', verifySignup);

const activeUser = {
    id: 1,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: Role.Admin,
    status: UserStatus.Active,
    createdAt: new Date(),
};

describe('POST /auth/verify-signup', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        await i18nReady;
    });

    it('should return 204 for a valid token', async () => {
        (VerificationTokensRepository.verifySignupToken as jest.Mock).mockResolvedValue({ userId: 1 });
        jest.spyOn(UserRepository, 'updateUserStatus').mockResolvedValue(undefined); // Since it's void
        jest.spyOn(UserRepository, 'getUserById').mockResolvedValue(activeUser); // Since it's void
        jest.spyOn(emailService, 'sendAccountActivationEmail').mockResolvedValue(undefined); // because it returns void

        const response = await request(app)
            .post('/auth/verify-signup')
            .send({ token: 'signup-valid-1' });

        expect(response.status).toBe(204);
        expect(VerificationTokensRepository.verifySignupToken).toHaveBeenCalledWith('signup-valid-1');
        expect(UserRepository.updateUserStatus).toHaveBeenCalledWith(1, 'active');
        expect(emailService.sendAccountActivationEmail).toHaveBeenCalledWith({t: expect.anything(), userEmail: activeUser.email });
    });

    it('should return 400 for a used token', async () => {
        (VerificationTokensRepository.verifySignupToken as jest.Mock).mockRejectedValue(
            new AppError('tokens.signup.used', {}, 400)
        );

        const response = await request(app)
            .post('/auth/verify-signup')
            .send({ token: 'signup-used-1' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('This verification link has already been used. If you haven’t completed your signup, request a new link.');
    });

    it('should return 400 for an expired token', async () => {
        (VerificationTokensRepository.verifySignupToken as jest.Mock).mockRejectedValue(
            new AppError('tokens.signup.expired', {}, 400)
        );

        const response = await request(app)
            .post('/auth/verify-signup')
            .send({ token: 'signup-expired-1' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Your verification link has expired. Please request a new one to continue.');
    });

    it('should return 400 for a non-existent token or invalid token', async () => {
        (VerificationTokensRepository.verifySignupToken as jest.Mock).mockRejectedValue(
            new AppError('tokens.signup.invalid', {}, 400)
        );

        const response = await request(app)
            .post('/auth/verify-signup')
            .send({ token: 'signup-invalid-1' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('The verification link is invalid or no longer available. Please check the link or request a new one.');
    });

    it('should return 500 for unexpected error', async () => {
        (VerificationTokensRepository.verifySignupToken as jest.Mock).mockRejectedValue(
            new Error('Some unexpected DB failure')
        );

        const response = await request(app)
            .post('/auth/verify-signup')
            .send({ token: 'signup-valid-1' });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('An unexpected error occurred. Please try again later or contact support.');
    });
});
