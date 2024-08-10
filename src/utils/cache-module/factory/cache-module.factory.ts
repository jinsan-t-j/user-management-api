import type { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import type { IEnvs } from '../../../shared/interfaces';

/**
 * The cache module configuration
 */
export const CacheModuleFactory: CacheModuleAsyncOptions = {
    isGlobal: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService<IEnvs>) => {
        return {
            store: await redisStore.redisStore({
                socket: {
                    host: configService.getOrThrow('REDIS_HOST'),
                    port: configService.getOrThrow('REDIS_PORT'),
                },
                password: configService.get('REDIS_PASSWORD'),
                ttl: configService.getOrThrow('CACHE_DEFAULT_TTL'),
            }),
        };
    },
};
