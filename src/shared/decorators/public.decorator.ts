import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ROUTE_KEY = 'isPublicRoute';

/**
 * A custom decorator that define a route to allow access without authentication.
 *
 * @returns The custom public decorator.
 */
export const Public = () => SetMetadata(IS_PUBLIC_ROUTE_KEY, true);
