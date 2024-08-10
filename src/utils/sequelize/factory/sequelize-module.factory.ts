import { ConfigModule, ConfigService } from '@nestjs/config';
import type { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';
import type { Dialect } from 'sequelize';
import path from 'path';

import { AppEnv } from '../../../shared/constants';
import type { IEnvs } from '../../../shared/interfaces';

const MODULE_DIRECTORY = path.resolve(__dirname, '../../../modules/');

export const SequelizeModuleFactory: SequelizeModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService<IEnvs>) => ({
        dialect: configService.getOrThrow<Dialect>('DATABASE_TYPE'),
        host: configService.getOrThrow<string>('DATABASE_HOST'),
        port: configService.getOrThrow<number>('DATABASE_PORT'),
        database: configService.getOrThrow<string>('DATABASE_NAME'),
        username: configService.getOrThrow<string>('DATABASE_USERNAME'),
        password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
        models: [`${MODULE_DIRECTORY}/**/*.model.ts`],
        autoLoadModels: true,
        logQueryParameters: configService.getOrThrow<string>('APP_ENV') !== AppEnv.PROD,
        synchronize: false,
        minifyAliases: true,
    }),
    inject: [ConfigService],
};
