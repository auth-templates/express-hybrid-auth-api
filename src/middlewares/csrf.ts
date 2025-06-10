import { csrfSync } from 'csrf-sync';
import { Request, Response } from 'express';

const {
    csrfSynchronisedProtection,
    generateToken,
} = csrfSync();

export const csrfTokenHandler = (request: Request, response: Response) => {
    const token = generateToken(request);
    response.cookie('XSRF-TOKEN', token, {
        httpOnly: false,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    }).json({ csrfToken: token });
};

export const csrfProtection = csrfSynchronisedProtection;