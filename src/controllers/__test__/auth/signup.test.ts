import request from 'supertest';
import express from 'express';
import { signup } from '../../authController.js'; // Import your controller function
import { UserRepository } from '../../../repositories/users.js'; // Mocked repository
import { hashPassword } from '../../../lib/password.js';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n.js';
import { CreateUserInput, Role } from '../../../models/user.js';
import { AppError } from '../../../lib/error.js';
import { VerificationTokensRepository } from '../../../repositories/verification-tokens.js';
import * as emailService from '../../../lib/mailer.js';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('../../../repositories/users.js');
vi.mock('../../../lib/password.js');

// Create an Express app to test the route
const app = express();
app.use(i18nMiddleware)
app.use(express.json());
app.post('/signup', signup); // Attach your controller to a route

const signupData: CreateUserInput = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "$SuperSecurePasswod123",
    role: Role.Admin,
    termsAccepted: true
}

describe('POST /signup', () => {
    beforeAll(async () => {
        await i18nReady;
    })

    it('should return 204 if signup data is correct', async () => {        
        vi.mocked(hashPassword).mockResolvedValue('hashedPassword123');
        vi.mocked(UserRepository.createUser).mockResolvedValue(100); // Simulate successful creation
        vi.spyOn(VerificationTokensRepository, 'createToken').mockResolvedValue(undefined); // Since it's void
        vi.spyOn(emailService, 'sendVerificationEmail').mockResolvedValue(undefined); // because it returns void

        const response = await request(app).post('/signup').set('Accept-Language', 'en').send(signupData);

        expect(response.status).toBe(204);
        expect(UserRepository.createUser).toHaveBeenCalledWith({
            ...signupData,
            password: undefined,
            passwordHash: "hashedPassword123"
        });

        expect(emailService.sendVerificationEmail).toHaveBeenCalledWith({
            t: expect.anything(), 
            userEmail: signupData.email, 
            expiresInMinutes: 30, 
            token: expect.stringMatching(/^[A-Za-z0-9]{64}$/),
        });
    });

    it('should return 409 if email is already in use', async () => {
        vi.mocked(UserRepository.createUser).mockRejectedValue(new AppError('errors.email_address_already_in_use', {}, AppStatusCode.EMAIL_ALREADY_IN_USE, 409));

        const response = await request(app)
        .post('/signup').set('Accept-Language', 'en')
        .send(signupData);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ messages: [{text:'This email address is already in use. Please use a different one.', severity: "error"}], code: AppStatusCode.EMAIL_ALREADY_IN_USE});
    });

    it('should return 500 if an unexpected error occurs', async () => {
        vi.mocked(UserRepository.createUser).mockRejectedValue(new Error('internal error'));

        const response = await request(app)
        .post('/signup')
        .send(signupData);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({messages: [{text:'An unexpected error occurred. Please try again later or contact support.', severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
    });

    it('should return 400 if password is missing one digit', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
            ...signupData,
            password: "$Suuuuup"
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text:'Password must contain at least one digit', severity: "error"}]});
    });

    it('should return 400 if password is longer than 100 characters', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
            ...signupData,
            password: "%Supdasdasdasdasdasdasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdasdasdasdasdasdasdasd123",
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text: 'Password must be at most 100 characters', severity: "error"}]});
    });

    it('should return 400 if password is less than 8 characters', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          password: "%Sup123"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages:[{text:'Password must be at least 8 characters', severity: "error"}]});
    });

    it('should return 400 if password does no contain at least one special character', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          password: "Suuuuup123"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages:[{text: 'Password must contain at least one special character', severity: "error"}]});
    });
      
    it('should return 400 if first name is missing', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          firstName: ""
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text:'First name must be at least 1 character', severity: "error"}]});
    });

    it('should return 400 if first name is longer than 30 characters', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          firstName: "6543543534534534534534534535453534535345345"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toEqual({messages: [{text:'First name must be at most 30 characters', severity: "error"}]});
    });

    it('should return 400 if last name is missing', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
        ...signupData,
        lastName: ""
        });
    
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({ messages: [{text:'Last name must be at least 1 character', severity: "error"}]});
    });

    it('should return 400 if last name is longer than 30 characters', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          lastName: "6543543534534534534534534535453534535345345"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({ messages: [{text:'Last name must be at most 30 characters', severity: "error"}]});
    });

    it('should return 400 if email is invalid', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          email: "john.doe.example.com"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({messages: [{text:'Invalid email address', severity: "error"}]});
    });

    it('should return 400 if role is invalid', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          role: "ds"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({messages: [{text: "Invalid type: Expected (\"employee\" | \"manager\" | \"admin\") but received \"ds\"", severity: "error"}]});
    });

    it('should return 400 if terms and conditions is not accepted', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          termsAccepted: false 
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({messages:[{text: "You must accept the terms and conditions.", severity: "error"}]});
    });
});

