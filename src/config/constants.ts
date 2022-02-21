const types = {
  Logger: Symbol.for('Logger'),
  Controller: {
    HEALTH_CHECK: Symbol.for('HealthCheckController'),
    SERVICE_INFO: Symbol.for('ServiceInfoController'),
  },
  Service: {
    SERVICE_INFO: Symbol.for('ServiceInfoService'),
  },
};

const reflectMetadataKeys = {
  CLASS_NAME: 'className',
  METHOD_NAME: 'methodName',
};

export { types, reflectMetadataKeys };
