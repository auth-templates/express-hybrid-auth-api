import request from 'supertest';
import express from 'express';
import { signup } from './authController'; // Import your controller function
import { UserRepository } from '../repositories/users'; // Mocked repository
import { hashPassword } from '../lib/password';
import { i18nMiddleware, i18nReady } from '../middlewares/i18n';
import { CreateUserInput, Role } from '../models/user';
import { AppError } from '../lib/error';

jest.mock('../repositories/users');
jest.mock('../lib/password');

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
    role: Role.Admin
}

describe('POST /signup', () => {
    beforeAll(async () => {
        await i18nReady;
    })

    it('should return 204 if signup data is correct', async () => {        
        (hashPassword as jest.Mock).mockResolvedValue('hashedPassword123');
        (UserRepository.createUser as jest.Mock).mockResolvedValue(undefined); // Simulate successful creation

        const response = await request(app).post('/signup').set('Accept-Language', 'en').send(signupData);

        expect(response.status).toBe(204);
        expect(UserRepository.createUser).toHaveBeenCalledWith({
            ...signupData,
            password: undefined,
            passwordHash: "hashedPassword123"
        });
    });

    it('should return 409 if email is already in use', async () => {
        (UserRepository.createUser as jest.Mock).mockRejectedValue(new AppError('errors.is_already_in_use', { item: 'email' }, 409));

        const response = await request(app)
        .post('/signup')
        .send(signupData);

        expect(response.status).toBe(409);
        expect(response.body.message).toBe('email is already in use');
    });

    it('should return 500 if an unexpected error occurs', async () => {
        (UserRepository.createUser as jest.Mock).mockRejectedValue(new Error('internal error'));

        const response = await request(app)
        .post('/signup')
        .send(signupData);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('An unexpected error occurred. Please try again later or contact support.');
    });

    it('should return 400 if password is missing', async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
            ...signupData,
            password: "$Suuuuup"
        });

        console.log("response.body", response.body);
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(['Password must contain at least one digit']);
    });

    it('should return 400 if password is longer than 100 characters', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
            ...signupData,
            password: "%Supdasdasdasdasdasdasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdasdasdasdasdasdasdasd123",
        });

        console.log("response.body", response.body);
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(['Password must be at most 100 characters']);
    });

    it('should return 400 if password is less than 8 characters', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          password: "%Sup123"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(['Password must be at least 8 characters']);
    });

    it('should return 400 if password does no contain at least one special character', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          password: "Suuuuup123"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(['Password must contain at least one special character']);
    });
      
    it('should return 400 if first name is missing', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          firstName: ""
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(['First name must be at least 1 character']);
    });

    it('should return 400 if first name is longer than 30 characters', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          firstName: "6543543534534534534534534535453534535345345"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(['First name must be at most 30 characters']);
    });

    it('should return 400 if last name is missing', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
        ...signupData,
        lastName: ""
        });
    
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(['Last name must be at least 1 character']);
    });

    it('should return 400 if last name is longer than 30 characters', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          lastName: "6543543534534534534534534535453534535345345"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(['Last name must be at most 30 characters']);
    });

    it('should return 400 if email is invalid', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          email: "john.doe.example.com"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(['Invalid email address']);
    });

    it('should return 400 if role is invalid', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
          ...signupData,
          role: "ds"
        });
      
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual([ "Invalid type: Expected (\"employee\" | \"manager\" | \"admin\") but received \"ds\""]);
    });
});