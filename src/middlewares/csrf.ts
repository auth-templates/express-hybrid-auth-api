import { Request, Response } from 'express';
import { validateSessionToken } from '../lib/session';
import { deleteSessionTokenCookie, setSessionTokenCookie } from '../lib/cookie';

function csrf(request: Request, response: Response, next: any): void {
	if ( request.method !== "GET" ) {
		const origin = request.headers["Origin"];
		// You can also compare it against the Host or X-Forwarded-Host header.
		if ( origin === null || origin !== "https://example.com" ) {
            response.status(403);
            return;
		}
	}
    next();
}

async function auth(request: Request, response: Response, next: any): Promise<void> {
	const token = request.cookies.get("session");
	if ( token === null ) {
		response.sendStatus(401);
		return;
	}

	const session = await validateSessionToken(token);

	if ( session === null ) {
		deleteSessionTokenCookie(response);
		response.sendStatus(401);
		return;
	}
    
	setSessionTokenCookie(response, token, session.expiresAt);
    next();
}