import { ConfigModule, ConfigService } from '@nestjs/config';
import type { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

import type { IEnvs } from '../../../shared/interfaces';

export const JwtModuleFactory: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService<IEnvs>): JwtModuleOptions => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
            algorithm: configService.get<any>('JWT_ALGORITHM') || 'HS256',
            expiresIn: configService.get<number>('JWT_EXPIRY'),
            audience: configService.get<string>('JWT_AUDIENCE'),
            subject: configService.get<string>('JWT_AUDIENCE'),
            issuer: configService.get<string>('JWT_AUDIENCE'),
        },
    }),
    inject: [ConfigService],
};
