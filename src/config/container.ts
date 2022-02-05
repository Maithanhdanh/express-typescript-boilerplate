import { types } from '@config/constants';
import { logger } from '@config/logger';
import {
  HealthCheckController,
  HealthCheckControllerImpl,
} from '@controller/health-check/healthCheck.controller';
import {
  ServiceInfoService,
  ServiceInfoServiceImpl,
} from '@server/application/service-info/serviceInfo.service';
import {
  ServiceInfoController,
  ServiceInfoControllerImpl,
} from '@server/controller/service-info/serviceInfo.controller';
import { Container } from 'inversify';

const createContainer = (): Container => {
  logger.debug(`[${createContainer.name}] Register service on Container`);
  const container = new Container();

  //Controller
  container
    .bind<HealthCheckController>(types.Controller.HEALTH_CHECK)
    .to(HealthCheckControllerImpl);
  container
    .bind<ServiceInfoController>(types.Controller.SERVICE_INFO)
    .to(ServiceInfoControllerImpl);

    //Service
  container
    .bind<ServiceInfoService>(types.Service.SERVICE_INFO)
    .to(ServiceInfoServiceImpl);

  return container;
};

export default createContainer;
