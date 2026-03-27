import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

interface ValidationExceptionResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse =
      exception.getResponse() as ValidationExceptionResponse;

    response.status(status).json({
      success: false,
      message: 'Validation failed',
      errors: exceptionResponse.message,
      timestamp: new Date().toISOString(),
      statusCode: status,
    });
  }
}
