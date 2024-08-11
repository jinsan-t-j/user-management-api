import type { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import type { Response } from 'express';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResponse<T> {
    /**
     * The text for displaying the credibility of the response.
     */
    message: string;
    /**
     * The data of the response.
     */
    data?: T;
    /**
     * The error stack occurred in the API.
     */
    error?: T;
}

/**
 * The interceptor class for modifying API response.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    /**
     * Handler for intercept API response.
     *
     * @param context - Execution context.
     * @param next - Next handler.
     * @returns Observable.
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        const response = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            map((data) => {
                return {
                    success: this._getSuccessStatus(response.statusCode),
                    message: data?.message,
                    ...(data.data && { data: data.data }),
                    ...(data.error && { error: data.error }),
                };
            }),
        );
    }

    /**
     * Get the success status from response.
     *
     * @param statusCode - The status code from response express HTTP response instance.
     * @returns Boolean.
     */
    private _getSuccessStatus(statusCode: number): boolean {
        const successCodes: number[] = [
            HttpStatus.OK,
            HttpStatus.CREATED,
            HttpStatus.ACCEPTED,
            HttpStatus.NO_CONTENT,
        ];

        return successCodes.includes(statusCode);
    }
}
