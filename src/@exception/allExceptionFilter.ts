import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: any;
    let stack = getErrorStack(exception);

    console.log('Exception stack: ', exception.stack);
    console.log('.......................................................');

    console.log(stack);
    console.log('........................................................');

    console.log('From All Exception', exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      stack = exception.stack;
    } else {
      status = 500;
      stack = '';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      stack: stack,
    });
  }
}

export function getErrorStack(err: Error): string {
  if (!err.stack) {
    return '';
  } else {
    return err.stack
      .split('\n')
      .map((line) => line.trim())
      .join(' ');
  }
}
