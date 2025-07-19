
import { Request, Response, NextFunction } from 'express';
import { createMessageResponse } from '../lib/response';
import { AppStatusCode } from '@/@types/status-code';

/**
 * Blocks access to protected routes if session has termsAccepted = true.
 * Allows /auth/accept-terms route to pass through.
 */
export function requireTermsAcceptance(request: Request, response: Response, next: NextFunction): void {
    const termsAccepted = request.session?.termsAccepted;

    if ( termsAccepted && request.path !== '/auth/accept-terms' ) {
        response.status(403).json(createMessageResponse(request.t('validation.accept_terms'), 'error', AppStatusCode.TERMS_ACCEPTANCE_REQUIRED));
        return
    }

    next();
}