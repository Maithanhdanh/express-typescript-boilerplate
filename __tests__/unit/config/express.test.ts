import supertest from 'supertest';
import { createServer } from '@config/express';

describe('Server', () => {
  const app = createServer();

  it('should pass', (done) => {
    supertest(app).get('/health').expect('UP', done);
  });
});
