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
      interval: '1d',             // daily rotation
      maxFiles: 7,                // keep 7 files
      compress: 'gzip',           // compress old logs
    },
  },
];

if ( PRINT_LOGS_TO_CONSOLE ) {
    // Pretty console logs (optional, useful for local dev)
    transportTargets.push({
        target: 'pino-pretty',
        level: 'debug',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
        },    
    })
}

const logger = pino({
  level: LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: { targets: transportTargets },
});

export default logger;
