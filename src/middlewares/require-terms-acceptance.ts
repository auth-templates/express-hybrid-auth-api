import { Request, Response, NextFunction } from 'express';

export function requireTermsAcceptance(request: Request, response: Response, next: NextFunction): void {
    if (  request.path === '/auth/accept-terms' ) {
        return next();
    }

    if ( !request.session.termsAccepted ) {
        response.status(403).json({ message: request.t('validation.terms')});
        return;
    }

    next();
}
