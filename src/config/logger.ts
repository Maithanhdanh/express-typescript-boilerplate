import { createLogger, Logger, transports } from 'winston';

const LoggerWrapper = (): Logger => {
  return createLogger({
    transports: [new transports.Console()],
    exitOnError: false,
  });
};

export const logger = LoggerWrapper();

export const createChildLogger = (
  messagePrefix: string,
  subPrefix?: string,
): Logger =>
  Object.create(logger, {
    write: {
      value(info) {
        info.message = `[${messagePrefix}]${
          subPrefix ? ` [${subPrefix}]` : ''
        } ${info.message}`;
        logger.write(info);
      },
    },
  });

export function logGroup() {
  return (target: any) => {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(
        target.prototype,
        propertyName,
      );
      if (!descriptor) {
        continue;
      }

      const originalMethod = descriptor.value;
      const isMethod = originalMethod instanceof Function;
      if (!isMethod) {
        continue;
      }

      descriptor.value = function (...args: any[]) {
        (this as any).logger = createChildLogger(target.name, propertyName);
        return originalMethod.apply(this, args);
      };

      Object.defineProperty(target.prototype, propertyName, descriptor);
    }
  };
}
