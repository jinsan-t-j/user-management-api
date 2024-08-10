import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import type { ValidationError } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

import type { ICustomValidationErrors } from '../interface';

/**
 * The custom error validation formatter.
 * * The key will be the property name.
 * * The value will be the array of errors associated to that property.
 *
 * @param errors - The validation errors.
 * @returns - The formatter validation errors.
 */
const customErrorFormatter = (errors: ValidationError[]): ICustomValidationErrors => {
    if (!errors) {
        return {};
    }

    const customErrors: ICustomValidationErrors = {};

    errors.forEach((error: ValidationError) => {
        if (error.constraints && Object.keys(error.constraints).length) {
            customErrors[error.property] = Object.values(error.constraints);
        }

        if (error.children && Object.keys(error.children).length) {
            const customChildErrors = customErrorFormatter(error.children);
            Object.assign(customErrors, customChildErrors);
        }
    });

    return customErrors;
};

/**
 * The custom error validation exception filter.
 */
export class CustomI18nValidationExceptionFilter extends I18nValidationExceptionFilter {
    /**
     * The I18n custom http status code and format configuration.
     */
    constructor() {
        super({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            errorFormatter: (errors) => customErrorFormatter(errors),
        });
    }
}
