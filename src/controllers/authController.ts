import { Request, Response } from 'express';
import { createSession, generateSessionToken } from "../lib/session";
import { deleteSessionTokenCookie, setSessionTokenCookie } from '../lib/cookie';
import { prismaClient } from '../lib/prisma-client';
import { hashPassword } from "../lib/password";

export const signup = async (request: Request, response: Response): Promise<void> => {
    const { firstName, lastName, username, emailAddress, password } = request.body; 
    console.log("request.body", request.body);
    try { 
        await prismaClient.users.create({
            data: {
                name: firstName + ' ' + lastName,
                email: emailAddress,
                password_hash: await hashPassword(password),
                role: 'admin',
                created_at: new Date(Date.now())
            },
        });
        console.log(firstName, lastName, username, emailAddress );
    } catch ( error ) {
        response.status(500).json({ message: 'Error retrieving items', error })
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