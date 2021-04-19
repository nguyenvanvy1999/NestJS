import { transports, format } from 'winston';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';

const { combine, timestamp, printf } = format;
const logFormat = printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const AppLogger = WinstonModule.createLogger({
	format: combine(
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		logFormat
	),
	transports: [
		new transports.Console({
			format: combine(timestamp(), nestWinstonModuleUtilities.format.nestLike()),
		}),
		new transports.File({ filename: 'logs/error.log', level: 'error' }),
		new transports.File({ filename: 'logs/info.log', level: 'info' }),
		new transports.File({ filename: 'logs/debug.log', level: 'debug' }),
		new transports.File({ filename: 'logs/combined.log' }),
	],
});

const stream = {
	write: (message: string) => {
		AppLogger.debug(message.substring(0, message.lastIndexOf('\n')));
	},
};

export { AppLogger, stream };
