import request from 'supertest';
import express from 'express';
import { verifySignup } from '../../authController.js';
import { VerificationTokensRepository } from '../../../repositories/verification-tokens.js';
import { AppError } from '../../../lib/error.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import { UserRepository } from '../../../repositories/users.js';
import * as emailService from '../../../lib/mailer.js';
import { Role, UserStatus } from '../../../models/user.js';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('../../../repositories/verification-tokens.js');

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
        vi.clearAllMocks();
        await i18nReady;
    });

    it('should return 204 for a valid token', async () => {
        (VerificationTokensRepository.verifySignupToken as vi.Mock).mockResolvedValue({ userId: 1 });
        vi.spyOn(UserRepository, 'updateUserStatus').mockResolvedValue(undefined); // Since it's void
        vi.spyOn(UserRepository, 'getUserById').mockResolvedValue(activeUser); // Since it's void
        vi.spyOn(emailService, 'sendAccountActivationEmail').mockResolvedValue(undefined); // because it returns void

        const response = await request(app)
            .post('/auth/verify-signup')
            .send({ token: 'signup-valid-1' });

        expect(response.status).toBe(204);
        expect(VerificationTokensRepository.verifySignupToken).toHaveBeenCalledWith('signup-valid-1');
        expect(UserRepository.updateUserStatus).toHaveBeenCalledWith(1, 'active');
        expect(emailService.sendAccountActivationEmail).toHaveBeenCalledWith({t: expect.anything(), userEmail: activeUser.email });
    });

    it('should return 400 for a used token', async () => {
        (VerificationTokensRepository.verifySignupToken as vi.Mock).mockRejectedValue(
            new AppError('tokens.signup.already_used', {}, AppStatusCode.SIGNUP_TOKEN_ALREADY_USED, 400)
        );

        const response = await request(app)
            .post('/auth/verify-signup')
            .send({ token: 'signup-used-1' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text:'This verification link has already been used. If you haven’t completed your signup, request a new link.', severity: "error"}], code: AppStatusCode.SIGNUP_TOKEN_ALREADY_USED});
    });

    it('should return 400 for an expired token', async () => {
        (VerificationTokensRepository.verifySignupToken as vi.Mock).mockRejectedValue(
            new AppError('tokens.signup.expired', {}, AppStatusCode.SIGNUP_TOKEN_EXPIRED, 400)
        );

        const response = await request(app)
            .post('/auth/verify-signup')
            .send({ token: 'signup-expired-1' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text:'Your verification link has expired. Please request a new one to continue.', severity: "error"}], code: AppStatusCode.SIGNUP_TOKEN_EXPIRED});
    });

    it('should return 400 for a non-existent token or invalid token', async () => {
        (VerificationTokensRepository.verifySignupToken as vi.Mock).mockRejectedValue(
            new AppError('tokens.signup.invalid', {}, AppStatusCode.SIGNUP_TOKEN_INVALID, 400)
        );

        const response = await request(app)
            .post('/auth/verify-signup')
            .send({ token: 'signup-invalid-1' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text:'The verification link is invalid or no longer available. Please check the link or request a new one.', severity: "error"}], code: AppStatusCode.SIGNUP_TOKEN_INVALID});
    });

    it('should return 500 for unexpected error', async () => {
        (VerificationTokensRepository.verifySignupToken as vi.Mock).mockRejectedValue(
            new Error('Some unexpected DB failure')
        );

        const response = await request(app)
            .post('/auth/verify-signup')
            .send({ token: 'signup-valid-1' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({messages: [{text:'An unexpected error occurred. Please try again later or contact support.', severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });
});
