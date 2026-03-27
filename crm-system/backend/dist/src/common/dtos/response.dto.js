"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseInterceptor = exports.ApiResponse = void 0;
class ApiResponse {
    success;
    message;
    data;
    error;
    timestamp;
}
exports.ApiResponse = ApiResponse;
class ApiResponseInterceptor {
    static success(message, data) {
        return {
            success: true,
            message,
            data,
            timestamp: new Date(),
        };
    }
    static error(message, error) {
        return {
            success: false,
            message,
            error,
            timestamp: new Date(),
        };
    }
}
exports.ApiResponseInterceptor = ApiResponseInterceptor;
//# sourceMappingURL=response.dto.js.map