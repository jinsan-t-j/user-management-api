import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { I18nService } from 'nestjs-i18n';

import { BlockUserCommand } from '../impl/block-user.command';
import { UserStore } from '../../stores/user.store';
import type { I18nTranslations } from '../../../../i18n/types/i18n.generated';

@CommandHandler(BlockUserCommand)
export class BlockUserHandler implements ICommandHandler<BlockUserCommand> {
    private readonly logger = new Logger(BlockUserHandler.name);

    /**
     * Instantiate the BlockUserHandler class.
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
     * Executes the command BlockUserCommand.
     *
     * @param command - The command to execute.
     * @returns The boolean indicating the update.
     */
    async execute(command: BlockUserCommand): Promise<boolean> {
        const user = await this.userStore.findOneByUuid(command.uuid);

        if (!user) {
            throw new NotFoundException(
                this.i18n.t('messages.errors.not_found', {
                    args: this.i18n.t('terms.user'),
                }),
            );
        }

        const transaction = await this.sequelize.transaction();
        try {
            const user = await this.userStore.handleBlock(
                command.uuid,
                command.isBlocked,
                transaction,
            );
            await transaction.commit();

            return !!user;
        } catch (err) {
            await transaction.rollback();
            this.logger.error('Blocking/Unblocking the user failed.', err);
            throw err;
        }
    }
}
