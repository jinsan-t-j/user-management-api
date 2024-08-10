import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerModule } from '@nestjs/throttler';

import { SequelizeModuleFactory } from './utils/sequelize/factory';
import { ConfigModuleFactory } from './utils/config-module/factory';
import { I18nModuleFactory } from './utils/i18n/factory';
import { ThrottlerModuleFactory } from './utils/throttler/factory/throttler-module.factory';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot(ConfigModuleFactory),
        SequelizeModule.forRootAsync(SequelizeModuleFactory),
        ThrottlerModule.forRootAsync(ThrottlerModuleFactory),
        I18nModule.forRoot(I18nModuleFactory),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
