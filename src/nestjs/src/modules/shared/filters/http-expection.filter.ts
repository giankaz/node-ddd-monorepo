import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CoreError } from 'core';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (!(exception instanceof HttpException)) {
      if ((exception as unknown) instanceof CoreError) {
        const error = exception as unknown as CoreError;
        const statusCode = error?.statusCode || HttpStatus.BAD_REQUEST;
        response.status(statusCode).json({
          error: {
            message: error?.message,
            solution: error?.solution,
            context: error?.context,
            statusCode: statusCode,
            stacktrace: error?.stack,
          },
          data: null,
        });
        return;
      }
    }

    const errorResponse = {
      error: {
        ...exception,
        message: exception?.message,
        name: exception?.name,
        stacktrace: exception?.stack,
        cause: exception?.cause,
      },
      data: null,
    };

    response.status(response.statusCode || 400).json(errorResponse);

    return super.catch(exception, host);
  }
}
