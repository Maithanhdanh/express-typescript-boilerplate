import { ServiceInfoResponse } from '@application/service-info/type';
import { types } from '@config/constants';
import environment from '@config/environment';
import { logGroup } from '@config/customLogger';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';

interface ServiceInfoService {
  getServiceInfo(): ServiceInfoResponse;
}

@logGroup()
@injectable()
class ServiceInfoServiceImpl implements ServiceInfoService {
  constructor(@inject(types.Logger) private logger: Logger) {}

  public getServiceInfo(): ServiceInfoResponse {
    this.logger.info(`getting service info`);

    return {
      timestamp: Date.now().toString(),
      serviceName: environment.SERVICE_NAME,
      appVersion: environment.APP_VERSION,
    };
  }
}

export { ServiceInfoService, ServiceInfoServiceImpl };
