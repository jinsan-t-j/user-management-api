import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Catch, HttpException, HttpStatus, Inject, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';

import type { IHttpAdapterResponseBody } from '../../utils/winston/interface';
import type { IEnvs } from '../interfaces';
import { AppEnv } from '../constants';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
    /**
     * The Instantiate Exception filter class.
     *
     * @param httpAdapterHost - Instance of HTTP Adapter underlying the Nest App.
     * @param configService - Instance of config service.
     * @param logger - Instance of logger service.
     */
    public constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly configService: ConfigService<IEnvs>,
        @Inject(Logger)
        private readonly logger: LoggerService,
    ) {}

    /**
     * An exception handler.
     *
     * @param exception - Thrown exception or error.
     * @param host - The HTTP server instance.
     */
    catch(exception: Error, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();

        const responseBody: IHttpAdapterResponseBody = {
            status:
                exception instanceof HttpException
                    ? exception.getStatus()
                    : HttpStatus.INTERNAL_SERVER_ERROR,
            message: exception.message,
            data: {
                ...(this.configService.getOrThrow('APP_ENV') !== AppEnv.PROD && {
                    stack: exception.stack,
                }),
            },
        };

        this.logger.error(responseBody);
        this.httpAdapterHost.httpAdapter.reply(
            ctx.getResponse(),
            responseBody,
            responseBody.status,
        );
    }
}
