const environment = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVICE_NAME: process.env.APPLICATION_NAME || 'boilerplate',
  APP_VERSION: process.env.APP_VERSION || process.env.npm_package_version || '1.0.0',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '5000',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
};

export default environment;
