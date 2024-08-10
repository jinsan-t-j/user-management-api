import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetUserByUuidQuery } from '../impl';
import { UserStore } from '../../stores/user.store';
import type { User } from '../../model/user.model';

@QueryHandler(GetUserByUuidQuery)
export class GetUserByUuidHandler implements IQueryHandler<GetUserByUuidQuery> {
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
    async execute(query: GetUserByUuidQuery): Promise<User | null> {
        return await this.userStore.findOneByUuid(query.uuid);
    }
}
