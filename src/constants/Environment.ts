import * as config from '../../app.json';

const Environment = {
  NAME: config.name,
  DISPLAY_NAME: config.displayName,
  ENV: config.environment,
  URL: config.url,
  PORT: config.port,
  VERSION: config.version,
};

export default Environment;
