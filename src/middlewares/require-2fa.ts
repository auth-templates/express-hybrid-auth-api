import { Request, Response, NextFunction } from 'express';
import { createMessageResponse } from '../lib/response';

/**
 * Blocks access to protected routes if session has pending2FA = true.
 * Allows /auth/verify-2fa route to pass through.
 */
export function require2FA(request: Request, response: Response, next: NextFunction): void {
  const isPending2FA = request.session?.pending2FA;

  if ( isPending2FA && request.originalUrl !== '/auth/verify-2fa' ) {
    response.status(403).json(createMessageResponse(request.t('validation.terms'), 'error')); 
    return
  }

  next();
}
