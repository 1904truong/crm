import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
interface WrappedResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, WrappedResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<WrappedResponse<T>>;
}
export {};
