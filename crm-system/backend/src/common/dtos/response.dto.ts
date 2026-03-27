export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
  timestamp?: Date;
}

export class ApiResponseInterceptor {
  static success<T>(message: string, data?: T): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      timestamp: new Date(),
    };
  }

  static error(message: string, error?: any): ApiResponse<null> {
    return {
      success: false,
      message,
      error,
      timestamp: new Date(),
    };
  }
}
