import environment from '@config/environment';
import { createLogger, Logger, transports } from 'winston';

const LoggerWrapper = (): Logger => {
  return createLogger({
    transports: [new transports.Console()],
    level: environment.LOG_LEVEL,
    exitOnError: false,
  });
};

const createChildLogger = (messagePrefix: string, subPrefix?: string): Logger => {
  return Object.create(logger, {
    write: {
      value(info) {
        info.message = `[${messagePrefix}]${subPrefix ? ` [${subPrefix}]` : ''} ${info.message}`;
        logger.write(info);
      },
    },
  });
};

const logger = LoggerWrapper();

export { LoggerWrapper, createChildLogger, logger };
