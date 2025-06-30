import type { ErrorRequestHandler } from 'express';
import { createMessageResponse } from '../lib/response';

// Underscore prefix (_) marks parameters as intentionally unused
export const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
    if (error?.code === 'EBADCSRFTOKEN') {
        response.status(403).json(createMessageResponse('Invalid CSRF token', 'error'));
        return;
    }

    response.status(error.status || 500).json(createMessageResponse(
        error.message || request.t('errors.internal'), 'error'
    ));
};
