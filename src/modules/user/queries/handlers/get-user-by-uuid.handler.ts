import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';
import { I18nService } from 'nestjs-i18n';
import { NotFoundException } from '@nestjs/common';

import { GetUserByUuidQuery } from '../impl';
import { UserStore } from '../../stores/user.store';
import type User from '../../model/user.model';
import type { I18nTranslations } from '../../../../i18n/types/i18n.generated';

@QueryHandler(GetUserByUuidQuery)
export class GetUserByUuidHandler implements IQueryHandler<GetUserByUuidQuery> {
    /**
     * The instance of ValidateUserHandler.
     *
     * @param userStore - The user store instance.
     * @param i18n - The language translation instance.
     */
    public constructor(
        public readonly userStore: UserStore,
        private readonly i18n: I18nService<I18nTranslations>,
    ) {}

    /**
     * Get the user by phone number.
     *
     * @param query - The query to execute.
     * @throws {UnauthorizedException}.
     * @returns The authenticated user instance.
     */
    async execute(query: GetUserByUuidQuery): Promise<User | null> {
        const user = await this.userStore.findOneByUuid(query.uuid);

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
