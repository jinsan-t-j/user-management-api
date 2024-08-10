import type { ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';

import { IS_PUBLIC_ROUTE_KEY } from '../../../shared/decorators';

/**
 * Helper function to check whether the target handler or class having public_route.
 *
 * @param reflector - Reflector.
 * @param context - Execution context.
 * @returns Return boolean.
 */
export const isPublicRoute = (reflector: Reflector, context: ExecutionContext) => {
    return reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE_KEY, [
        context.getHandler(),
        context.getClass(),
    ]);
};
