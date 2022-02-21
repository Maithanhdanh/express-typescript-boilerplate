import environment from '@config/environment';
import { logger } from '@config/logger';
import express from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { AddressInfo, Server } from 'net';

const { host, port } = environment;

const startServer = (container: Container): Server => {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.disable('x-powered-by');
  });

  const app = server.build();
  const service = app.listen({ host, port }, () => {
    const addressInfo = service.address() as AddressInfo;
    logger.info(`Server ready at http://${addressInfo.address}:${addressInfo.port}`);
  });

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      logger.info(`process.once ${type}`);

      service.close(() => {
        logger.debug('HTTP server closed');
      });
    });
  });

  return service;
};

export { startServer };
