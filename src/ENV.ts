import * as path from 'path';
import { config } from 'dotenv';

config({
  path: path.join(process.cwd(), `${process.env.NODE_ENV || 'dev'}.env`),
});

export const ENV_DEVELOPMENT = 'development';

export const ENV = {
  port: process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  //isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
  //isStaging: process.env.NODE_ENV === ENV_STAGING,
  //isTest: process.env.NODE_ENV === ENV_QA,
  // isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  SALT_ROUNDS: +process.env.SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
};
