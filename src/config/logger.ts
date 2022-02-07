import { createLogger, Logger, transports } from 'winston';

const LoggerWrapper = (): Logger => {
  return createLogger({
    transports: [new transports.Console()],
    exitOnError: false,
  });
};

export const logger = LoggerWrapper();

export const createChildLogger = (messagePrefix: string): Logger =>
  Object.create(logger, {
    write: {
      value(info) {
        info.message = `[${messagePrefix}] ${info.message}`;
        logger.write(info);
      },
    },
  });
