import { Request, Response } from 'express';
import { createSession, generateSessionToken } from "../lib/session";
import { deleteSessionTokenCookie, setSessionTokenCookie } from '../lib/cookie';
import { hashPassword } from "../lib/password";
import { createSignupSchema, validateSignupData } from '../lib/validation-schemas/signup-schema';
import { UserRepository } from '../repositories/users';
import { AppError } from '../lib/error';

export const signup = async (request: Request, response: Response): Promise<void> => {
    // if ( !result.issues.length > 0 ) {
    //     throw new AppError(parseResult.error.format())
    //     response.status(400).json({ errors: parseResult.error.format() });
    //     return;
    // }

    try {
        const result = validateSignupData(request.body)

        const { firstName, lastName, email, password } = request.body; 

        UserRepository.createUser({
            firstName,
            lastName,
            email,
            passwordHash: await hashPassword(password),
            role: 'admin'
        });
        response.status(204).send();
    } catch ( error ) {
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
              message: request.t(error.translationKey, error.params),
            });
            return
        }
        console.error(error);
        response.status(500).json({ message: request.t('errors.internal') });
    }
}

export const login = async (request: Request, response: Response): Promise<void> => {
    const { email, password } = request.body;

    const userId = 1000;
    try {
        const token = generateSessionToken();
        const session = await createSession(token, userId);
        setSessionTokenCookie(response, token, session.expiresAt);
        response.status(200).send();
    } catch (error) {
        response.status(500).json({ message: 'Error retrieving items', error });
    }
};

export const logout = async (request: Request, response: Response): Promise<void> => {
    try {
        deleteSessionTokenCookie(response);
        response.status(204);
    } catch (error) {
        response.status(500).json({ message: 'Error retrieving items', error });
    }
}