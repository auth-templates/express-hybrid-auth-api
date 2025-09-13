import type { ErrorRequestHandler } from 'express';
import { createMessageResponse } from '../lib/response.js';
import logger from '@/lib/logger/index.js';
import { AppStatusCode } from '@/@types/status-code.js';

// Underscore prefix (_) marks parameters as intentionally unused
export const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
	if (error?.code === 'EBADCSRFTOKEN') {
		response
			.status(403)
			.json(createMessageResponse('Invalid CSRF token', 'error', AppStatusCode.CSRF_TOKEN_INVALID));
		return;
	}

	// Enhanced error logging for debugging
	logger.error({
		message: 'Global error handler caught error',
		err: error, // This will use the enhanced err serializer
		request: {
			method: request.method,
			url: request.url,
			headers: {
				'user-agent': request.headers['user-agent'],
				'content-type': request.headers['content-type'],
			},
		},
	});

	response
		.status(error.status || 500)
		.json(createMessageResponse(error.message || request.t('errors.internal'), 'error'));
};
