import request from 'supertest';
import express from 'express';
import { signup } from './authController'; // Import your controller function
import { UserRepository } from '../repositories/users'; // Mocked repository
import { hashPassword } from '../lib/password';
import { AppError } from '../lib/error';
import i18nMiddleware from '../middlewares/i18n';
import { CreateUserInput, Role } from '../models/user';

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
    it('should return 204 if signup data is correct', async () => {
        const response = await request(app).set('Accept-Language', 'en').post('/signup').send(signupData);

        // Mocking hashPassword and UserRepository.createUser
        (hashPassword as jest.Mock).mockResolvedValue('hashedPassword123');
        (UserRepository.createUser as jest.Mock).mockResolvedValue(undefined); // Simulate successful creation

        expect(response.status).toBe(204);
        expect(UserRepository.createUser).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            passwordHash: 'hashedPassword123',
            role: 'admin',
        });
    });

    it('should return 400 if password must contain at least one digit', async () => {
        const response = await request(app).post('/signup').set('Accept-Language', 'en').send({
            ...signupData,
            password: "$Suuuuup"

        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty(['password must contain at least one digit']);
    });

    // // ### Password must contain at most 100 characters
    // POST http://localhost:3000/auth/signup
    // content-type: application/json

    // {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "email": "john.doe@example.com",
    //     "password": "%Supdasdasdasdasdasdasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdasdasdasdasdasdasdasd123",
    //     "role": "admin"
    // }

    // // ### Password must contain at least 8 characters
    // POST http://localhost:3000/auth/signup
    // content-type: application/json

    // {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "email": "john.doe@example.com",
    //     "password": "%Sup123",
    //     "role": "admin"
    // }

    // // ### Password must contain at least one special character
    // POST http://localhost:3000/auth/signup
    // content-type: application/json

    // {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "email": "john.doe@example.com",
    //     "password": "Suuuuup123",
    //     "role": "admin"
    // }

    // // ### First name must be at least 1 character
    // POST http://localhost:3000/auth/signup
    // content-type: application/json

    // {
    //     "firstName": "",
    //     "lastName": "Doe",
    //     "email": "john.doe@example.com",
    //     "password": "%SuperSecurePassword123",
    //     "role": "admin"
    // }

    // // ### First name must be at most 30 characters
    // POST http://localhost:3000/auth/signup
    // content-type: application/json

    // {
    //     "firstName": "6543543534534534534534534535453534535345345",
    //     "lastName": "Doe",
    //     "email": "john.doe@example.com",
    //     "password": "%SuperSecurePassword123",
    //     "role": "admin"
    // }

    // // ### Last name must be at least 1 characters
    // POST http://localhost:3000/auth/signup
    // content-type: application/json

    // {
    //     "firstName": "John",
    //     "lastName": "",
    //     "email": "john.doe@example.com",
    //     "password": "%SuperSecurePassword123",
    //     "role": "admin"
    // }

    // // ### Last name must be at most 30 characters
    // POST http://localhost:3000/auth/signup
    // content-type: application/json

    // {
    //     "firstName": "John",
    //     "lastName": "6543543534534534534534534535453534535345345",
    //     "email": "john.doe@example.com",
    //     "password": "%SuperSecurePassword123",
    //     "role": "admin"
    // }

    // /### Invalid email address
    // POST http://localhost:3000/auth/signup
    // content-type: application/json

    // {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "email": "john.doe.example.com",
    //     "password": "%SuperSecurePassword123",
    //     "role": "admin"
    // }

    // ### Invalid role
    // POST http://localhost:3000/auth/signup
    // content-type: application/json

    // {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "email": "john.doe@example.com",
    //     "password": "%SuperSecurePassword123",
    //     "role": "ds"
    // }


});



/*

    it('should return 204 if user is created successfully', async () => {
        const validData = {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "password": "$SuperSecurePassword123"
        };

        // Mocking hashPassword and UserRepository.createUser
        (hashPassword as jest.Mock).mockResolvedValue('hashedPassword123');
        (UserRepository.createUser as jest.Mock).mockResolvedValue(undefined); // Simulate successful creation

        const response = await request(app).post('/signup').send(validData);

        expect(response.status).toBe(204);
        expect(UserRepository.createUser).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            passwordHash: 'hashedPassword123',
            role: 'admin',
        });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        const validData = {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "password": "$SuperSecurePassword123"
        };

        // Mock UserRepository to throw an error
        (UserRepository.createUser as jest.Mock).mockRejectedValue(new Error('Database error'));

        const response = await request(app)
        .post('/signup')
        .send(validData);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('An unexpected error occurred. Please try again later or contact support.');
    });

    it('should handle AppError and return custom error message', async () => {
        const validData = {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin.user@example.com',
            password: 'ValidPassword123',
        };

        // Simulate an AppError
        const appError = new AppError('errors.internal', {}, 500);
        (UserRepository.createUser as jest.Mock).mockRejectedValue(appError);

        const response = await request(app)
        .post('/signup')
        .send(validData);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('An unexpected error occurred. Please try again later or contact support.');
    });
    */