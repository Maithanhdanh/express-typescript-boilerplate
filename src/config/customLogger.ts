import { reflectMetadataKeys } from '@config/constants';
import { LoggerWrapper } from '@config/logger';
import { Logger } from 'winston';

interface CustomLogger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  setContext(message: string, ...args: any[]): void;
}

class CustomLoggerImpl implements CustomLogger {
  private className!: string;
  private methodName!: string;
  private logger: Logger = LoggerWrapper();

  debug(message: string, ...args: any[]): void {
    this.getContext();
    this.logger.debug(this.buildPrefixMessage(message), ...args);
  }

  info(message: string, ...args: any[]): void {
    this.getContext();
    this.logger.info(this.buildPrefixMessage(message), ...args);
  }

  error(message: string, ...args: any[]): void {
    this.getContext();
    this.logger.error(this.buildPrefixMessage(message), ...args);
  }

  setContext(className: string, methodName?: string): void {
    this.className = `[${className}] `;
    this.methodName = methodName ? `[${methodName}] ` : '';
  }

  private buildPrefixMessage(message: string): string {
    return this.className + this.methodName + message;
  }

  private getContext(): void {
    if (!this.className) {
      this.setContext(
        Reflect.getMetadata(reflectMetadataKeys.CLASS_NAME, this),
        Reflect.getMetadata(reflectMetadataKeys.METHOD_NAME, this),
      );
    }
  }
}

const customLogger = new CustomLoggerImpl();

function logGroup() {
  return (target: any) => {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
      if (!descriptor) {
        continue;
      }

      const originalMethod = descriptor.value;
      const isMethod = originalMethod instanceof Function;
      if (!isMethod) {
        continue;
      }

      descriptor.value = function (...args: any[]) {
        customLogger.setContext(target.name, propertyName);
        (this as any).logger = customLogger;

        Reflect.defineMetadata(reflectMetadataKeys.METHOD_NAME, propertyName, customLogger);
        Reflect.defineMetadata(reflectMetadataKeys.CLASS_NAME, target.name, customLogger);

        return originalMethod.apply(this, args);
      };

      Object.defineProperty(target.prototype, propertyName, descriptor);
    }
  };
}

export { CustomLogger, CustomLoggerImpl, customLogger, logGroup };
