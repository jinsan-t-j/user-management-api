import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { isPublicRoute } from '../helpers';

import { JwtAuthGuard } from './jwt-auth.guard';

/**
 * Application authentication guard.
 * All the protected API route should satisfies the JWT guard.
 */
@Injectable()
export class AppAuthGuard implements CanActivate {
    /**
     * Instantiate App auth guard.
     *
     * @param reflector - Instance of reflector.
     * @param jwtAuthGuard - JWT auth guard.
     */
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtAuthGuard: JwtAuthGuard,
    ) {}

    /**
     * Check whether the request is authenticated.
     *
     * @param context - Current execution context. Provides access to details about
     * the current request pipeline.
     * @returns Value indicating whether or not the current request is allowed to
     * proceed.
     */
    canActivate(context: ExecutionContext) {
        // If it is public route, then authentication not required.
        if (isPublicRoute(this.reflector, context)) {
            return true;
        }

        return this.jwtAuthGuard.canActivate(context);
    }
}
