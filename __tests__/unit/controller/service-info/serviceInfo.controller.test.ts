import supertest from 'supertest';
import { createContainer } from '@config/container';
import { InversifyExpressServer } from 'inversify-express-utils';

describe('ServiceInfo controller', () => {
  let agent: any;
  beforeAll(() => {
    const container = createContainer();
    const server = new InversifyExpressServer(container);
    const app = server.build();
    agent = supertest.agent(app);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return service info', (done) => {
    jest.spyOn(Date, 'now').mockReturnValue(123456789);

    const expectResult = {
      serviceName: 'boilerplate',
      appVersion: '1.0.1',
      timestamp: '123456789',
    };

    agent.get('/info').expect(expectResult, done);
  });
});
