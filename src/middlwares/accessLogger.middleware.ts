import {
  Injectable,
  NestMiddleware,
  Logger,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerConfig } from 'src/utils/logger.util';

@Injectable()
export class AccessLoggeerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, baseUrl } = request;

    // console.log(request);

    const userAgent = request.get('user-agent') || '';
    response.on('close', () => {
      const { statusCode, statusMessage } = response;
      const contentLength = response.get('content-length');
      const context = {
        message: 'AccessLog',
        method: method,
        url: baseUrl,
        statusCode: statusCode,
        statusMessage: statusMessage,
        contentLength: contentLength,
        userAgent: userAgent,
        ip: ip,
        level: 'Info',
      };

      console.log('Response: ', response);
      // console.log('Response Status: ', statusCode);

      if (statusCode >= 400) {
        context.statusMessage = statusMessage;
        this.logger.error(context);
      } else {
        this.logger.log(context);
        //console.log('.......Normal ......');
      }
    });

    next();
  }
}

export function getErrorStack(err: Error): string {
  if (!err.stack) {
    return '';
  }
  return err.stack
    .split('\n')
    .map((line) => line.trim())
    .join(' ');
}
