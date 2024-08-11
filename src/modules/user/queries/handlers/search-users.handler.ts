import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

import { SearchUsersQuery } from '../impl/search-users.query';
import { UserStore } from '../../stores/user.store';
import type User from '../../model/user.model';
import { NoContentException } from '../../../../shared/exceptions';

@QueryHandler(SearchUsersQuery)
export class SearchUsersHandler implements IQueryHandler<SearchUsersQuery> {
    /**
     * Instantiate the SearchUsersHandler class.
     *
     * @param userStore - The user store instance.
     */
    public constructor(private readonly userStore: UserStore) {}

    /**
     * Executes the query SearchUsersQuery.
     *
     * @param query - The query to execute.
     * @returns The list of users.
     */
    async execute(query: SearchUsersQuery): Promise<User[]> {
        let _birthDateOnMinAge: Date | null = null;
        let _birthDateOnMaxAge: Date | null = null;

        const minAge = query.searchUsersRequestDto?.minAge;
        const maxAge = query.searchUsersRequestDto?.maxAge;

        if (minAge) {
            _birthDateOnMinAge = this.calculateBirthDate(minAge);
        }

        if (maxAge) {
            _birthDateOnMaxAge = this.calculateBirthDate(maxAge);
        }

        const users = await this.userStore.search({
            username: query.username,
            ...(_birthDateOnMinAge && { birthDateOnMinAge: _birthDateOnMinAge }),
            ...(_birthDateOnMaxAge && { birthDateOnMaxAge: _birthDateOnMaxAge }),
        });

        if (!users?.length) {
            throw new NoContentException();
        }

        return users;
    }

    /**
     * Calculate the birth date from the given age.
     *
     * @param age - The age.
     * @returns The calculated birth date.
     */
    calculateBirthDate(age: number) {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() - age);
        return currentDate;
    }
}
