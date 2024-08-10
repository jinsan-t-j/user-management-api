import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
    ValidatorConstraint,
    type ValidationArguments,
    type ValidatorConstraintInterface,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';

import { GetUserByUsernameQuery } from '../queries/impl';
import type { I18nTranslations } from '../../../i18n/types/i18n.generated';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUsernameUniqueValidator implements ValidatorConstraintInterface {
    /**
     * Instantiate the IsEmailUniqueValidator class.
     *
     * @param queryBus - The command bus to execute the query/handler.
     * @param i18n - The language translation record instance.
     */
    public constructor(
        private readonly queryBus: QueryBus,
        private readonly i18n: I18nService<I18nTranslations>,
    ) {}

    /**
     * The custom validation to check whether a user exists by  or not in the database.
     *
     * @param username - The username of the respective user.
     * @returns If exists true else false.
     */
    async validate(username: string): Promise<boolean> {
        return !(await this.queryBus.execute(new GetUserByUsernameQuery(username)));
    }

    /**
     * The default message for validation.
     *
     * @param args - The arguments being sent to message builders.
     * @returns The message.
     */
    defaultMessage(args: ValidationArguments): string {
        return this.i18n.t('validations.already_exists', {
            args: { property: args.property },
        });
    }
}
