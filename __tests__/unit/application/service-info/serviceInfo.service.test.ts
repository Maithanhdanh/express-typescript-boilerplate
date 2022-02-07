import {
  ServiceInfoService,
  ServiceInfoServiceImpl,
} from '@server/application/service-info/serviceInfo.service';
import { createChildLogger } from '@server/config/logger';

describe('serviceInfo Service', () => {
  let service: ServiceInfoService;

  beforeEach(() => {
    service = new ServiceInfoServiceImpl(
      createChildLogger('ServiceInfoServiceImpl'),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return service info', () => {
    jest.spyOn(Date, 'now').mockReturnValue(123456789);

    const expectResult = {
      serviceName: 'boilerplate',
      appVersion: '1.0.1',
      timestamp: '123456789',
    };

    const info = service.getServiceInfo();
    expect(info).toEqual(expectResult);
  });
});
