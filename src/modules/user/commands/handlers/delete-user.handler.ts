import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { I18nService } from 'nestjs-i18n';

import { DeleteUserCommand } from '../impl/delete-user.command';
import { UserStore } from '../../stores/user.store';
import type { I18nTranslations } from '../../../../i18n/types/i18n.generated';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    private readonly logger = new Logger(DeleteUserHandler.name);

    /**
     * Instantiate the DeleteUserHandler class.
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
     * Executes the command DeleteUserCommand.
     *
     * @param command - The command to execute.
     * @returns The boolean indicating the delete operation.
     */
    async execute(command: DeleteUserCommand): Promise<boolean> {
        const transaction = await this.sequelize.transaction();
        const uuid = command.uuid;
        try {
            const user = await this.userStore.findOneByUuid(uuid);

            if (!user) {
                throw new NotFoundException(
                    this.i18n.t('messages.errors.not_found', {
                        args: this.i18n.t('terms.user'),
                    }),
                );
            }

            const deleted = await this.userStore.delete(uuid, transaction);
            if (!deleted) {
                throw new InternalServerErrorException(
                    this.i18n.t('messages.errors.internal_server'),
                );
            }
            await transaction.commit();
            return !!deleted;
        } catch (err) {
            await transaction.rollback();
            this.logger.error('Updating user failed.', err);
            throw err;
        }
    }
}
