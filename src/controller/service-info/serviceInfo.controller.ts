import { ServiceInfoService } from '@application/service-info/serviceInfo.service';
import { ServiceInfoResponse } from '@application/service-info/type';
import { types } from '@config/constants';
import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';

export interface ServiceInfoController extends interfaces.Controller {
  getServiceInfo(): ServiceInfoResponse;
}

@controller('/info')
export class ServiceInfoControllerImpl implements ServiceInfoController {
  constructor(@inject(types.Service.SERVICE_INFO) private serviceInfo: ServiceInfoService) {}

  @httpGet('/')
  public getServiceInfo(): ServiceInfoResponse {
    return this.serviceInfo.getServiceInfo();
  }
}
