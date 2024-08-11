import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetUserByUsernameQuery } from '../impl';
import { UserStore } from '../../stores/user.store';
import type User from '../../model/user.model';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler implements IQueryHandler<GetUserByUsernameQuery> {
    /**
     * The instance of ValidateUserHandler.
     *
     * @param userStore - The user store instance.
     */
    public constructor(public readonly userStore: UserStore) {}

    /**
     * Get the user by phone number.
     *
     * @param query - The query to execute.
     * @throws {UnauthorizedException}.
     * @returns The authenticated user instance.
     */
    async execute(query: GetUserByUsernameQuery): Promise<User | null> {
        return await this.userStore.findOneByUsername(query.username);
    }
}
