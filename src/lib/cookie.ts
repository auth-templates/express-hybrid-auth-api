import { Response, Request } from "express";

export function setSessionTokenCookie(response: Response, token: string, expiresAt: Date): void {
	if ( process.env.NODE_ENV === 'production') { // When deployed over HTTPS
		response.cookie(
			"Set-Cookie",
			`session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure;`
		);
	} else { // When deployed over HTTP (localhost)
		response.cookie(
			"Set-Cookie",
			`session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/`
		);
	}
}

export function deleteSessionTokenCookie(response: Response): void {
	if ( process.env.NODE_ENV === 'production') { // When deployed over HTTPS
		response.cookie(
			"Set-Cookie",
			"session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;"
		);
	} else { // When deployed over HTTP (localhost)
		response.cookie("Set-Cookie", "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/");
	}
}
