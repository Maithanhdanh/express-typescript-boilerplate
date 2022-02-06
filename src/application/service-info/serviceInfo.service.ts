import { ServiceInfoResponse } from '@application/service-info/type';
import environment from '@config/environment';
import { createChildLogger } from '@config/logger';
import { injectable } from 'inversify';
import { Logger } from 'winston';

const loggerGroup =
  (serviceName: string) =>
  <T extends { new (...args: any[]): {} }>(constructor: T) =>
    class extends constructor {
      logger = createChildLogger(serviceName);
    };
interface ServiceInfoService {
  getServiceInfo(): ServiceInfoResponse;
}

@loggerGroup('ServiceInfoServiceImpl')
@injectable()
class ServiceInfoServiceImpl implements ServiceInfoService {
  private logger: Logger;

  public getServiceInfo(): ServiceInfoResponse {
    this.logger.info(`[${this.getServiceInfo.name}] getting service info`);

    return {
      timestamp: Date.now().toString(),
      serviceName: environment.SERVICE_NAME,
      appVersion: environment.APP_VERSION,
    };
  }
}

export { ServiceInfoService, ServiceInfoServiceImpl };
