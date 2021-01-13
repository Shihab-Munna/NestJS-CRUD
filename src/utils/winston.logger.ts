import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'Info',
  format: winston.format.json(),
  defaultMeta: true,

  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    //   filename: config.log.errorFileName,
    //   level: 'error',
    // }),
    // new winston.transports.File({ filename: 'combined.log' })
  ],
});
