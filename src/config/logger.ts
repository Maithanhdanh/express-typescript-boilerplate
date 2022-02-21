import winston from 'winston';

const LoggerWrapper = (): winston.Logger => {
  return winston.createLogger({
    transports: [new winston.transports.Console()],
    exitOnError: false,
  });
};

export const logger = LoggerWrapper();
