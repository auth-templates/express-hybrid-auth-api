import { Request, Response } from 'express';

export function csrf(request: Request, response: Response, next: any): void {
	if ( request.method !== "GET" ) {
		const origin = request.headers["Origin"];
		// You can also compare it against the Host or X-Forwarded-Host header.
		if ( origin === null || origin !== "http://localhost:3000" ) {
            response.status(403);
            return;
		}
	}
    next();
}