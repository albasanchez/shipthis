import { AppLoggerService } from 'src/log/applogger.service';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ShipthisException } from '../exceptions/abstract.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof ShipthisException
        ? exception.getErrorMessage()
        : 'Unknown Error';
    if (exception instanceof BadRequestException) {
      const err_res = JSON.parse(JSON.stringify(exception.getResponse()));
      message = err_res.message;
    }

    const msg =
      exception instanceof Error ? exception.message : 'Unknown Error';

    const resp_obj = {
      statusCode: status,
      shipthisMesagge: message,
      message: msg,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    const appLogger: AppLoggerService = new AppLoggerService();

    appLogger.error(
      `Error Handling Request\nErrorMessage: ${resp_obj.shipthisMesagge}\nPath: ${resp_obj.path}`,
    );

    response.status(status).json(resp_obj);
  }
}
