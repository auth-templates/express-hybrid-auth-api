
import { Request, Response, NextFunction } from 'express';

/**
 * Blocks access to protected routes if session has termsAccepted = true.
 * Allows /auth/accept-terms route to pass through.
 */
export function requireTermsAcceptance(request: Request, response: Response, next: NextFunction): void {
    const termsAccepted = request.session?.termsAccepted;

    if ( termsAccepted && request.path !== '/auth/accept-terms' ) {
        response.status(403).json({ message: request.t('validation.terms')});
        return
    }

    next();
}