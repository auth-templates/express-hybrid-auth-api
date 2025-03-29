import { Request, Response } from 'express';
import { createSession, generateSessionToken } from "../lib/session";
import { deleteSessionTokenCookie, setSessionTokenCookie } from '../lib/cookie';

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
        // to do: invalidate session calls

        deleteSessionTokenCookie(response);

        response.status(204);
    } catch (error) {
        response.status(500).json({ message: 'Error retrieving items', error });
    }
}