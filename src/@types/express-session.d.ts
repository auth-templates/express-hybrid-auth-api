import 'express-session';

export type SessionUser = {
    id: number;
    email: string;
};

declare module 'express-session' {
  interface SessionData {
    user?: SessionUser
    pending2FA?: boolean,
  }
}