import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { I18nService } from 'nestjs-i18n';

import { UpdateUserCommand } from '../impl/update-user.command';
import { UserStore } from '../../stores/user.store';
import type { I18nTranslations } from '../../../../i18n/types/i18n.generated';
import type User from '../../model/user.model';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    private readonly logger = new Logger(UpdateUserHandler.name);

    /**
     * Instantiate the UpdateUserHandler class.
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
     * Executes the command UpdateUserCommand.
     *
     * @param command - The command to execute.
     * @returns The newly updated user.
     */
    async execute(command: UpdateUserCommand): Promise<User> {
        const transaction = await this.sequelize.transaction();
        const uuid = command.uuid;
        try {
            await this.getUserByUuid(uuid);

            const userData = {
                uuid,
                name: command.payload.name,
                surname: command.payload.surname,
                username: command.payload.username,
                birthDate: command.payload.birthDate,
            };
            const updated = await this.userStore.update(userData, transaction);
            if (!updated) {
                throw new InternalServerErrorException(
                    this.i18n.t('messages.errors.internal_server'),
                );
            }
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            this.logger.error('Updating user failed.', err);
            throw err;
        }

        return await this.getUserByUuid(uuid);
    }

    /**
     * The user by UUID.
     *
     * @param uuid - The user UUID.
     * @returns The user from the database.
     */
    private async getUserByUuid(uuid: string): Promise<User> {
        const user = await this.userStore.findOneByUuid(uuid);

        if (!user) {
            throw new NotFoundException(
                this.i18n.t('messages.errors.not_found', {
                    args: this.i18n.t('terms.user'),
                }),
            );
        }

        return user;
    }
}
