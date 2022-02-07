import { startServer } from '@config/express';
process.env.port = '3001';

jest.mock('@config/container', () => ({
  createContainer: jest.fn().mockImplementation(() => {
    return { get: jest.fn() };
  }),
}));
jest.mock('@config/express');

describe('Index', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should work', async () => {
    await import('@server/index');
    expect(startServer).toBeCalledTimes(1);
  });
});
