import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { IEnvs } from '../../../shared/interfaces';
import type { IJwt } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    /**
     * Instantiate the JwtStrategy class.
     *
     * @param configService - The NestJs config module service.
     */
    constructor(private readonly configService: ConfigService<IEnvs>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
            algorithm: configService.get<any>('JWT_ALGORITHM') || 'HS256',
            expiresIn: configService.get<number>('JWT_EXPIRY'),
            audience: configService.get<string>('JWT_AUDIENCE'),
            subject: configService.get<string>('JWT_AUDIENCE'),
            issuer: configService.get<string>('JWT_AUDIENCE'),
        });
    }

    /**
     * Validate the JWT.
     *
     * @param payload - The JWT payload.
     * @returns The authenticated user identity.
     */
    validate(payload: IJwt): string {
        return payload.sub;
    }
}
