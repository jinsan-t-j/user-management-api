import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetUsersQuery } from '../impl';
import { UserStore } from '../../stores/user.store';
import type User from '../../model/user.model';
import { NoContentException } from '../../../../shared/exceptions';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    /**
     * The instance of ValidateUserHandler.
     *
     * @param userStore - The user store instance.
     */
    public constructor(public readonly userStore: UserStore) {}

    /**
     * Get the user by phone number.
     *
     * @throws {UnauthorizedException}.
     * @returns The authenticated user instance.
     */
    async execute(): Promise<User[] | null> {
        const users = await this.userStore.findAll();

        if (!users?.length) {
            throw new NoContentException();
        }

        return users;
    }
}
