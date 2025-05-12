import request from 'supertest';
import express from 'express';
import { login } from '../../authController';
import { AppError } from '../../../lib/error';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n';
import { UserRepository } from '../../../repositories/users';

jest.mock('../../../repositories/users');

const app = express();
app.use(i18nMiddleware);
app.use(express.json());
app.post('/auth/login', login);

const validUser = {
    id: 1,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: 'admin',
    createdAt: new Date(),
};

describe('POST /auth/login', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    it('should return 200 and user data for valid credentials', async () => {
        (UserRepository.login as jest.Mock).mockResolvedValue(validUser);

        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({
                email: 'dev@mail.com',
                password: '$SuperSecurePassword45',
            });

        expect(response.status).toBe(200);
        expect(response.body.email).toBe('dev@mail.com');
    });

    it('should return 400 for invalid email format', async () => {
        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({
                email: 'dev.mail.com',
                password: '$SuperSecurePassword45',
            });

        expect(response.status).toBe(400);
        expect(response.body[0]).toMatch("Invalid email address");
    });

    it('should return 400 for missing fields', async () => {
        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body[0]).toMatch("Invalid email or password. Please try again.");
    });

    it('should return 400 for invalid credentials (wrong password but valid)', async () => {
        (UserRepository.login as jest.Mock).mockRejectedValue(
            new AppError('errors.invalid_credentials', {}, 400)
        );

        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({
                email: 'dev@mail.com',
                password: '$SuperSecurePassword46',
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toMatch("Invalid email or password. Please try again.");
    });

    it('should return 500 for internal errors', async () => {
        (UserRepository.login as jest.Mock).mockRejectedValue(new Error('Unexpected failure'));

        const response = await request(app)
            .post('/auth/login')
            .set('Accept-Language', 'en')
            .send({
                email: 'dev@mail.com',
                password: '$SuperSecurePassword45',
            });

        expect(response.status).toBe(500);
        expect(response.body.message).toMatch("An unexpected error occurred. Please try again later or contact support.");
    });
})
