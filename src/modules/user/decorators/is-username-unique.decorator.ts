import type { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

import { IsUsernameUniqueValidator } from '../validators';

/**
 * The custom decorator used to check whether the phone number of a user already exists in the database.
 *
 * @param validationOptions - The options used to pass to validation decorators.
 * @returns The registered custom decorator.
 */
export function IsUsernameUnique(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isUsernameUnique',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsUsernameUniqueValidator,
        });
    };
}
