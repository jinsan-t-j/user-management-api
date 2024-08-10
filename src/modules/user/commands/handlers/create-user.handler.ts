import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { I18nService } from 'nestjs-i18n';

import { CreateUserCommand } from '../impl/create-user.command';
import { UserStore } from '../../stores/user.store';
import type { User } from '../../model/user.model';
import type { I18nTranslations } from '../../../../i18n/types/i18n.generated';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    private readonly logger = new Logger(CreateUserHandler.name);

    /**
     * Instantiate the CreateUserHandler class.
     *
     * @param userStore - The user store instance.
     * @param sequelize - The sequelize instance.
     * @param i18n - The language translation instance.
     */
    public constructor(
        private readonly userStore: UserStore,
        private readonly sequelize: Sequelize,
        private readonly i18n: I18nService<I18nTranslations>,
    ) {}

    /**
     * Executes the command CreateUserCommand.
     *
     * @param command - The command to execute.
     * @returns The newly created user.
     */
    async execute(command: CreateUserCommand): Promise<User> {
        const transaction = await this.sequelize.transaction();
        try {
            const userData = {
                name: command.payload.name,
                username: command.payload.username,
                ...(command.payload.surname && { surname: command.payload.surname }),
                ...(command.payload.birthDate && { birthDate: command.payload.birthDate }),
            };

            const user = await this.userStore.createUser(userData, transaction);
            if (!user) {
                throw new InternalServerErrorException(
                    this.i18n.t('messages.errors.internal_server'),
                );
            }

            await transaction.commit();

            return user;
        } catch (err) {
            await transaction.rollback();
            this.logger.error('Creating user failed.', err);
            throw err;
        }
    }
}
