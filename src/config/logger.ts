import winston from 'winston';

const LoggerWrapper = (): winston.Logger => {
  return winston.createLogger({
    transports: [new winston.transports.Console()],
    exitOnError: false,
  });
};

export const logger = LoggerWrapper();

export const createChildLogger = (massagePrefix: string): winston.Logger =>
  Object.create(logger, {
    write: {
      value(info) {
        info.message = `[${massagePrefix}] ${info.message}`;
        logger.write(info);
      },
    },
  });
