import {
  ServiceInfoService,
  ServiceInfoServiceImpl,
} from '@application/service-info/serviceInfo.service';
import { types } from '@config/constants';
import { createChildLogger, logger } from '@config/logger';
import {
  HealthCheckController,
  HealthCheckControllerImpl,
} from '@controller/health-check/healthCheck.controller';
import {
  ServiceInfoController,
  ServiceInfoControllerImpl,
} from '@controller/service-info/serviceInfo.controller';
import { getClassNameFromRequest } from '@utils/container';
import { Container, interfaces } from 'inversify';
import { Logger } from 'winston';

const createContainer = (): Container => {
  logger.debug(`[${createContainer.name}] Register service on Container`);
  const container = new Container();

  //Logger
  container
    .bind<Logger>(types.Logger)
    .toDynamicValue((context: interfaces.Context) => {
      const namedMetadata = getClassNameFromRequest(context);
      return createChildLogger(namedMetadata);
    });

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
