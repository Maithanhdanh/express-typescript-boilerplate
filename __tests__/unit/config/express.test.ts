import { createContainer } from '@config/container';
import { startServer } from '@config/express';
import { Server } from 'net';

describe('Server', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start successfully', () => {
    const listen = jest.spyOn(Server.prototype, 'listen');
    const container = createContainer();
    startServer(container);
    expect(listen).toBeCalled();

    const server = listen.mock.results[0].value as Server;
    setImmediate(() => {
      server.close();
    });
    listen.mockRestore();
  });
});
