import { GetUserByUsernameHandler } from './get-user-by-username.handler';
import { GetUsersHandler } from './get-users.handler';
import { GetUserByUuidHandler } from './get-user-by-uuid.handler';
import { SearchUsersHandler } from './search-users.handler';

export const userQueryHandlers = [
    GetUserByUuidHandler,
    GetUsersHandler,
    GetUserByUsernameHandler,
    SearchUsersHandler,
];

export { GetUserByUuidHandler, GetUsersHandler, GetUserByUsernameHandler, SearchUsersHandler };
