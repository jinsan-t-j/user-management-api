import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
    BlockUserCommand,
    CreateUserCommand,
    UpdateUserCommand,
    DeleteUserCommand,
} from '../commands/impl';
import type { CreateUserRequestDto, SearchUsersRequestDto, UpdateUserRequestDto } from '../dto';
import { UserRecordDto } from '../dto';
import { GetUserByUuidQuery, GetUsersQuery, SearchUsersQuery } from '../queries/impl';
import type { User } from '../model/user.model';

/**
 * user service class
 */
@Injectable()
export class UserService {
    /**
     * Instantiate user service.
     *
     * @param commandBus - The command bus.
     * @param queryBus - The query bus.
     */
    public constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    /**
     * Create user record in the database.
     *
     * @param createUserDto - User input data.
     * @returns Created user record.
     */
    async create(createUserDto: CreateUserRequestDto): Promise<UserRecordDto> {
        const user: User = await this.commandBus.execute(new CreateUserCommand(createUserDto));

        return new UserRecordDto(user.toJSON());
    }

    /**
     * Retrieve user from database.
     * This function return user record if found else null is
     * returned, exception is not thrown.
     *
     * @param uuid - UUID of user.
     * @returns User record if found else null.
     */
    async findOne(uuid: string): Promise<UserRecordDto> {
        const user = await this.queryBus.execute(new GetUserByUuidQuery(uuid));

        return new UserRecordDto(user.toJSON());
    }

    /**
     * Retrieve all the users available in the system.
     *
     * @returns List of all files.
     */
    async findAll(): Promise<UserRecordDto[]> {
        const users: User[] = await this.queryBus.execute(new GetUsersQuery());

        return users.map((user) => new UserRecordDto(user.toJSON()));
    }

    /**
     * Update user record in the database.
     *
     * @param updateUserDto - Updating data.
     * @param uuid - The uuid of the user.
     * @returns Updated user record.
     */
    async update(updateUserDto: UpdateUserRequestDto, uuid: string): Promise<UserRecordDto> {
        const user = await this.commandBus.execute(new UpdateUserCommand(updateUserDto, uuid));

        return new UserRecordDto(user.toJSON());
    }

    /**
     * Delete a user from database.
     *
     * @param uuid - Uuid id of user.
     * @returns User record if found else null.
     */
    async deleteByUuid(uuid: string): Promise<number> {
        return await this.commandBus.execute(new DeleteUserCommand(uuid));
    }

    /**
     * Update user record in the database.
     *
     * @param searchUsersRequestDto - The search users request DTO.
     * @param username - The username to be searched.
     * @returns Updated user record.
     */
    async search(
        searchUsersRequestDto?: SearchUsersRequestDto,
        username?: string,
    ): Promise<UserRecordDto[]> {
        const users: User[] = await this.queryBus.execute(
            new SearchUsersQuery(searchUsersRequestDto, username),
        );

        return users.map((user) => new UserRecordDto(user.toJSON()));
    }

    /**
     * Handle the blocked or unblocked user in the database.
     *
     * @param uuid - The uuid of the user.
     * @param isBlocked - To determine the user is whether blocked or not.
     * @returns The boolean indicating the update.
     */
    async handleBlock(uuid: string, isBlocked: boolean): Promise<boolean> {
        return !!(await this.commandBus.execute(new BlockUserCommand(uuid, isBlocked)));
    }
}
