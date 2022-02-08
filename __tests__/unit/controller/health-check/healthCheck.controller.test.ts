import supertest from 'supertest';
import { createContainer } from '@config/container';
import { InversifyExpressServer } from 'inversify-express-utils';

describe('healthCheck controller', () => {
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

  it('should return UP', (done) => {
    agent.get('/health').expect('UP', done);
  });
});
