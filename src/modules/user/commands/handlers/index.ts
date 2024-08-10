import { CreateUserHandler } from './create-user.handler';
import { UpdateUserHandler } from './update-user.handler';
import { DeleteUserHandler } from './delete-user.handler';
import { BlockUserHandler } from './block-user.handler';

export const userCommandHandlers = [
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    BlockUserHandler,
];

export { CreateUserHandler, UpdateUserHandler, DeleteUserHandler, BlockUserHandler };
