import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@src/logger/logger.service';

/**
 * HTTP exception 을 받아서 처리합니다.
 * Client 에 전달할 예외처리를 표준화 할 수 있습니다.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(this.constructor.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.debug(`${this.constructor.name}.catch() works`);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
