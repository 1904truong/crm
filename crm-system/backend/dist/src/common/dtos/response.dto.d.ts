export declare class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: unknown;
    timestamp?: Date;
}
export declare class ApiResponseInterceptor {
    static success<T>(message: string, data?: T): ApiResponse<T>;
    static error(message: string, error?: any): ApiResponse<null>;
}
