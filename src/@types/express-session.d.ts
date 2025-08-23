import 'express-session';

export type SessionUser = {
	id: number;
	email: string;
};

declare module 'express-session' {
	interface SessionData {
		csrfToken?: string;
		user?: SessionUser;
		pending2FA?: boolean;
		termsAccepted?: boolean;
	}
}

declare global {
	namespace Express {
		interface Request {
			csrfToken(overwrite?: boolean): string; // added by csrf-sync
		}
	}
}
