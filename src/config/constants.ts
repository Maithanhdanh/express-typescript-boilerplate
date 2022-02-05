const types = {
  Logger: Symbol.for('ILogger'),
  Controller: {
    HEALTH_CHECK: Symbol.for('HealthCheckController'),
    SERVICE_INFO: Symbol.for('ServiceInfoController'),
  },
  Service: {
    BASE_SERVICE: Symbol.for('BaseService'),
    SERVICE_INFO: Symbol.for('ServiceInfoService'),
  },
};

export { types };
