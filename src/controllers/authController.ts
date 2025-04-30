import { Request, Response } from 'express';
import { createSession, generateSessionToken } from "../lib/session";
import { deleteSessionTokenCookie, setSessionTokenCookie } from '../lib/cookie';
import { hashPassword } from "../lib/password";
import { validateSignupData } from '../lib/validation-schemas/signup-schema';
import { UserRepository } from '../repositories/users';
import { AppError } from '../lib/error';
import { Role } from '../models/user';
import { sendTestEmail } from '../lib/mailer';

export const signup = async (request: Request, response: Response): Promise<void> => {
    try {
        const issues = validateSignupData(request.body);

        if ( issues.length > 0 ) {
            response.status(400).json(
                issues.map(({message, items}) => request.t(message, items))
            );
            return
        }

        const { firstName, lastName, email, password, role } = request.body; 

        await UserRepository.createUser({
            firstName,
            lastName,
            email,
            passwordHash: await hashPassword(password),
            role: role as Role
        });
     
        await sendTestEmail();
        response.status(204).send();
    } catch ( error ) {
        console.log(error);
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
              message: request.t(error.translationKey, error.params),
            });
            return
        }
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