import { pino } from 'pino';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const PRINT_LOGS_TO_CONSOLE = process.env.PRINT_LOGS_TO_CONSOLE;

const transportTargets: pino.TransportTargetOptions[] = [
	// Rotating file logs using pino/file
	{
		target: 'pino/file',
		level: 'info',
		options: {
			destination: 'logs/app.log',
			mkdir: true,
			rotate: true,
			interval: '1d', // daily rotation
			maxFiles: 7, // keep 7 files
			compress: 'gzip', // compress old logs
		},
	},
	// Always log all levels to console for immediate visibility
	{
		target: 'pino-pretty',
		level: 'debug',
		options: {
			colorize: true,
			translateTime: 'SYS:standard',
			ignore: 'pid,hostname', // Remove pid and hostname for cleaner console output
		},
	},
];

const logger = pino({
	level: LOG_LEVEL,
	timestamp: pino.stdTimeFunctions.isoTime,
	transport: { targets: transportTargets },
	serializers: {
		err: (err) => ({
			type: err?.constructor?.name || 'Unknown',
			message: err?.message || 'No message',
			code: err?.code || 'No code',
			stack: err?.stack?.split('\n').slice(0, 5).join('\n'), // Only first 5 lines of stack
			...err,
		}),
	},
});

export default logger;
