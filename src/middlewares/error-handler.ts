import type { ErrorRequestHandler } from 'express';

// Underscore prefix (_) marks parameters as intentionally unused
export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error?.code === 'EBADCSRFTOKEN') {
    response.status(403).json({ message: 'Invalid CSRF token' });
    return;
  }

  response.status(error.status || 500).json({
    message: error.message || 'Internal Server Error',
  });
};
