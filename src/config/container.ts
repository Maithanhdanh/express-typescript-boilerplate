import { ServiceInfoService, ServiceInfoServiceImpl } from '@application/service-info/serviceInfo.service';
import { types } from '@config/constants';
import { CustomLogger, CustomLoggerImpl } from '@config/customLogger';
import { logger } from '@config/logger';
import { HealthCheckController, HealthCheckControllerImpl } from '@controller/health-check/healthCheck.controller';
import { ServiceInfoController, ServiceInfoControllerImpl } from '@controller/service-info/serviceInfo.controller';
import { getClassNameFromRequest } from '@utils/container';
import { Container, interfaces } from 'inversify';

const createContainer = (): Container => {
  logger.debug(`[${createContainer.name}] Register service on Container`);
  const container = new Container();

  //Logger (reference: https://dev.to/maithanhdanh/enhance-logger-using-inversify-context-and-decorators-2gbe)
  container.bind<CustomLogger>(types.Logger).toDynamicValue((context: interfaces.Context) => {
    const namedMetadata = getClassNameFromRequest(context);
    const logger = new CustomLoggerImpl();
    logger.setContext(namedMetadata);
    return logger;
  });

  //Controller
  container.bind<HealthCheckController>(types.Controller.HEALTH_CHECK).to(HealthCheckControllerImpl);
  container.bind<ServiceInfoController>(types.Controller.SERVICE_INFO).to(ServiceInfoControllerImpl);

  //Service
  container.bind<ServiceInfoService>(types.Service.SERVICE_INFO).to(ServiceInfoServiceImpl);

  return container;
};

export { createContainer };
