import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Observable } from 'rxjs';

import { JwtAuthGuardName } from '../constants/auth.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JwtAuthGuardName) {
    /**
     * The guard activation.
     *
     * @param context -  The Current execution context.
     * @returns Value indicating whether or not the current request is allowed to proceed.
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    /**
     * The JWT authentication handler.
     *
     * @param err - The error details.
     * @param user - The authenticated user.
     * @returns The user.
     */
    handleRequest(err: any, user: any) {
        if (user) {
            return user;
        }
    }
}
