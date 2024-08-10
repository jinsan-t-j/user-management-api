import type { INestApplication } from '@nestjs/common';
import type { SwaggerCustomOptions } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * The swagger module configuration.
 *
 * @param app - The Nest Factory instance.
 * @param path - The url path for the swagger documentation.
 */
export const swaggerModuleFactory = (app: INestApplication, path: string) => {
    const config = new DocumentBuilder()
        .setTitle('User Management API Documentation')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'jwt-auth',
                description: 'Enter JWT token',
                in: 'header',
            },
            'jwt-auth',
        )
        .build();

    const customOptions: SwaggerCustomOptions = {
        customSiteTitle: 'User Management API Documentation',
        swaggerOptions: {
            persistAuthorization: true,
        },
    };

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(path, app, document, customOptions);
};
