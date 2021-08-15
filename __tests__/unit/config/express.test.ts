import supertest from 'supertest';
import { createServer } from '@config/express';

describe('Server', async () => {
  const app = await createServer();

  it('should pass', (done) => {
    supertest(app).get('/health').expect('UP', done);
  });
});
