import type { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

import type { IEnvs } from '../../../shared/interfaces';
import { AppEnv } from '../../../shared/constants';

/**
 * Config module configuration
 */
export const ConfigModuleFactory: ConfigModuleOptions = {
    /**
     * Environment variables validation schema (Joi).
     */
    validationSchema: Joi.object<IEnvs, true, IEnvs>({
        APP_NAME: Joi.string().required(),
        APP_ENV: Joi.string().required().valid(AppEnv.PROD, AppEnv.DEV),
        APP_URL: Joi.string().required(),
        APP_PORT: Joi.number().required(),
        DATABASE_TYPE: Joi.string().required().valid('postgres'),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_PASSWORD: Joi.string().optional(),
        CACHE_DEFAULT_TTL: Joi.number().required(),
        JWT_ALGORITHM: Joi.string().optional().default('HS256'),
        JWT_SECRET: Joi.string().required(),
        JWT_ISSUER: Joi.string().required(),
        JWT_SUBJECT: Joi.string().required(),
        JWT_AUDIENCE: Joi.string().required(),
        JWT_EXPIRY: Joi.number().optional().default(87600),
        API_THROTTLE_TTL: Joi.number().optional(),
        API_THROTTLE_LIMIT: Joi.number().optional(),
        SWAGGER_DOC_URL_PATH: Joi.string().optional(),
    }),
};
