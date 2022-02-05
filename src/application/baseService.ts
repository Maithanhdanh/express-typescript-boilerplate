import { createChildLogger } from '@config/logger';
import { injectable } from 'inversify';
import { Logger } from 'winston';

@injectable()
export class BaseService {
  protected logger: Logger;

  constructor(serviceName: string) {
    this.logger = createChildLogger(serviceName);
  }
}
