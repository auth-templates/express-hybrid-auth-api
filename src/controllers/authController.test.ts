import request from 'supertest';
import express from 'express';
import { signup } from './authController'; // Import your controller function
import { UserRepository } from '../repositories/users'; // Mocked repository
import { hashPassword } from '../lib/password';
import { AppError } from '../lib/error';
import i18nMiddleware from '../middlewares/i18n';

jest.mock('../repositories/users');
jest.mock('../lib/password');

// Create an Express app to test the route
const app = express();
app.use(i18nMiddleware)
app.use(express.json());
app.post('/signup', signup); // Attach your controller to a route

describe('POST /signup', () => {
  it('should return 400 if validation fails', async () => {
    const invalidData = {
      firstName: '',
      lastName: '',
      email: 'invalidEmail',
      password: 'short', // assuming your validation requires a valid email and longer password
    };

    const response = await request(app)
      .post('/signup')
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveProperty('email');
    expect(response.body.errors).toHaveProperty('password');
  });

//   it('should return 204 if user is created successfully', async () => {
//     const validData = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       password: 'ValidPassword123',
//     };

//     // Mocking hashPassword and UserRepository.createUser
//     (hashPassword as jest.Mock).mockResolvedValue('hashedPassword123');
//     (UserRepository.createUser as jest.Mock).mockResolvedValue(undefined); // Simulate successful creation

//     const response = await request(app)
//       .post('/signup')
//       .send(validData);

//     expect(response.status).toBe(204);
//     expect(UserRepository.createUser).toHaveBeenCalledWith({
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       passwordHash: 'hashedPassword123',
//       role: 'admin',
//     });
//   });

//   it('should return 500 if an unexpected error occurs', async () => {
//     const validData = {
//       firstName: 'Jane',
//       lastName: 'Doe',
//       email: 'jane.doe@example.com',
//       password: 'ValidPassword123',
//     };

//     // Mock UserRepository to throw an error
//     (UserRepository.createUser as jest.Mock).mockRejectedValue(new Error('Database error'));

//     const response = await request(app)
//       .post('/signup')
//       .send(validData);

//     expect(response.status).toBe(500);
//     expect(response.body.message).toBe('An unexpected error occurred. Please try again later or contact support.');
//   });

//   it('should handle AppError and return custom error message', async () => {
//     const validData = {
//       firstName: 'Admin',
//       lastName: 'User',
//       email: 'admin.user@example.com',
//       password: 'ValidPassword123',
//     };

//     // Simulate an AppError
//     const appError = new AppError('errors.internal', {}, 500);
//     (UserRepository.createUser as jest.Mock).mockRejectedValue(appError);

//     const response = await request(app)
//       .post('/signup')
//       .send(validData);

//     expect(response.status).toBe(500);
//     expect(response.body.message).toBe('An unexpected error occurred. Please try again later or contact support.');
//   });
});
