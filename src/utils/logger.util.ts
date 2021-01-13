// import * as winston from 'winston';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import winston, { format, transports } from 'winston';
export class LoggerConfig {
  private readonly options: winston.LoggerOptions;

  constructor() {
    this.options = {
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.metadata(),
        format.timestamp(),
        format.json(),
        format.printf((msg) => {
          //console.log(msg);
          return `${msg.timestamp} [${msg.level}] - ${msg.message} - method: ${msg.metadata.method} - url: ${msg.metadata.url} - statusCode: ${msg.metadata.statusCode} - statusMessage: ${msg.metadata.statusMessage} - userAgent: ${msg.metadata.userAgent} - ContantLength: ${msg.metadata.contentLength}`;
        }),
      ),
      transports: [new transports.Console({ level: 'debug' })], // alert > error > warning > notice > info > debug
    };
  }

  public console(): any {
    return this.options;
  }
}
