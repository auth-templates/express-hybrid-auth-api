import { pinoHttp } from 'pino-http';
import logger from './logger.js';

export function createHttpLogger() {
	// Use the main logger instance for consistency

	return pinoHttp({
		logger,
		serializers: {
			req: (req) => ({
				method: req.method,
				url: req.url,
				headers: {
					'user-agent': req.headers['user-agent'],
					'content-type': req.headers['content-type'],
					authorization: req.headers['authorization'] ? '[REDACTED]' : undefined,
				},
				remoteAddress: req.remoteAddress,
				remotePort: req.remotePort,
			}),
			res: (res) => ({
				statusCode: res.statusCode,
			}),
			err: (err) => ({
				type: err.type,
				message: err.message,
				code: err.code,
				stack: err.stack?.split('\n').slice(0, 3).join('\n'), // Only first 3 lines of stack
				...err,
			}),
		},
		customLogLevel: (req, res, err) => {
			if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
			if (res.statusCode >= 500) return 'error';
			if (err) return 'error';
			return 'info';
		},
		customSuccessMessage: (req, res) => {
			if (res.statusCode >= 400) {
				return `${req.method} ${req.url} - ${res.statusCode}`;
			}
			return `${req.method} ${req.url} - ${res.statusCode}`;
		},
		customErrorMessage: (req, res, err) => {
			return `${req.method} ${req.url} - ${res.statusCode} - ${err?.message || 'Unknown error'}`;
		},
	});
}
