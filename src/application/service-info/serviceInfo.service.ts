import { types } from '@config/constants';
import { ServiceInfoResponse } from '@application/service-info/type';
import environment from '@config/environment';
import { inject, injectable } from 'inversify';
import { ILogger, LoggingContext } from 'inversify-logging';

interface ServiceInfoService {
  getServiceInfo(): ServiceInfoResponse;
}

@injectable()
@LoggingContext('ServiceInfoServiceImpl')
class ServiceInfoServiceImpl implements ServiceInfoService {
  @inject(types.Logger) logger: ILogger;

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
