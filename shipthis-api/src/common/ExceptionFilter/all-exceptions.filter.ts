import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ShipthisException } from '../exceptions/abstract.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('exception :>> ', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof ShipthisException
        ? exception.getErrorMessage()
        : 'Unknown Error';

    const msg =
      exception instanceof Error ? exception.message : 'Unknown Error';

    response.status(status).json({
      statusCode: status,
      shipthisMesagge: message,
      message: msg,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
