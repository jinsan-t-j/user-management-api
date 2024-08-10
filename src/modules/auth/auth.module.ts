import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { JwtAuthGuardName } from './constants/auth.constant';
import { authGuards } from './guards';
import { authStrategies } from './strategies';
import { JwtModuleFactory } from './factory';
import { AppAuthGuard } from './guards/app-auth.guard';

@Module({
    imports: [
        ConfigModule,
        PassportModule.register({ defaultStrategy: JwtAuthGuardName }),
        JwtModule.registerAsync(JwtModuleFactory),
    ],
    providers: [
        ...authGuards,
        ...authStrategies,

        /**
         * Application Authentication guard.
         */
        { provide: APP_GUARD, useClass: ThrottlerGuard },

        /**
         * Application Authentication guard.
         */
        { provide: APP_GUARD, useClass: AppAuthGuard },
    ],
})
export class AuthModule {}
