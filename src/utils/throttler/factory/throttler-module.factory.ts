import { ConfigModule, ConfigService } from '@nestjs/config';
import type { ThrottlerAsyncOptions, ThrottlerModuleOptions } from '@nestjs/throttler';

import type { IEnvs } from '../../../shared/interfaces';

/**
 * Throttler Module factory configurations.
 */
export const ThrottlerModuleFactory: ThrottlerAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService<IEnvs>): ThrottlerModuleOptions => {
        return {
            throttlers: [
                {
                    ttl: configService.getOrThrow<number>('API_THROTTLE_TTL'),
                    limit: configService.getOrThrow<number>('API_THROTTLE_LIMIT'),
                },
            ],
        };
    },
    inject: [ConfigService],
};
