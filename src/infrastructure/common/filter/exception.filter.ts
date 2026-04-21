import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { LoggerService } from '../../logger/logger.service';
interface IError {
  message: string;
  code_error: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: Response = ctx.getRequest();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as Error).message, code_error: null };

    const responseException = {
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      ...message,
    };
    this.logMessage(request, message, statusCode, exception);
    response.status(statusCode).send(responseException);
  }

  private logMessage(
    request: any,
    message: IError,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}
