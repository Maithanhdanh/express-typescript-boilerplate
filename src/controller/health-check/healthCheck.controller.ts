import { controller, httpGet, interfaces } from 'inversify-express-utils';

export interface HealthCheckController extends interfaces.Controller {
  checkHealth(): string;
}

@controller('/')
export class HealthCheckControllerImpl implements HealthCheckController {
  @httpGet('health')
  public checkHealth(): string {
    return 'UP';
  }
}
