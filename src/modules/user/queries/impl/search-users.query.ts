import type { SearchUsersRequestDto } from '../../dto/search-users-request-dto';

export class SearchUsersQuery {
    /**
     * Instantiate the BlockUserQuery class.
     *
     * @param searchUsersRequestDto - The search users request DTO.
     * @param username - The username.
     */
    public constructor(
        public readonly searchUsersRequestDto?: SearchUsersRequestDto,
        public readonly username?: string,
    ) {}
}
