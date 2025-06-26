import { Request, Response, NextFunction } from 'express';

/**
 * Blocks access to protected routes if session has pending2FA = true.
 * Allows /auth/verify-2fa route to pass through.
 */
export function require2FA(request: Request, response: Response, next: NextFunction): void {
  const isPending2FA = request.session?.pending2FA;

  if ( isPending2FA && request.path !== '/auth/verify-2fa' ) {
    response.status(403).json({ message: request.t('validation.terms') }); 
    return
  }

  next();
}
