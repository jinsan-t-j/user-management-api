import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nValidationPipe } from 'nestjs-i18n';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import type { IEnvs } from './shared/interfaces';
import { WinstonFactory } from './utils/winston/factory/winston.factory';
import { swaggerModuleFactory } from './utils/swagger/factory';
import { AppEnv } from './shared/constants';
import { TransformInterceptor } from './shared/interceptors';
import { ExceptionHandlerFilter } from './shared/filters';
import { CustomI18nValidationExceptionFilter } from './utils/i18n/filter/i18n-validation-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonFactory('User Management API'),
    });

    app.enableCors({ origin: '*' });
    app.enableVersioning({ type: VersioningType.URI });
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalPipes(new I18nValidationPipe({ transform: true }));

    const configService = app.get(ConfigService<IEnvs>);
    const logger = new Logger(bootstrap.name);
    app.useGlobalFilters(
        new ExceptionHandlerFilter(app.get(HttpAdapterHost), configService, logger),
    );
    
    app.useGlobalFilters(new CustomI18nValidationExceptionFilter());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.setGlobalPrefix('api');

    bootstrapDevelopmentServices(app);

    const port = configService.getOrThrow<number>('APP_PORT');
    await app.listen(port);
    logger.log(`Application running on port ${port}`);
}

/**
 * Bootstrapping development services.
 *
 * @param app - The Nest Factory instance.
 */
const bootstrapDevelopmentServices = (app: INestApplication) => {
    const configService = app.get(ConfigService<IEnvs>);
    if (configService.getOrThrow<string>('APP_ENV') !== AppEnv.PROD) {
        const path = configService.get<string>('SWAGGER_DOC_URL_PATH');
        path && swaggerModuleFactory(app, path);
    }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
