import { i18nValidationMessage } from 'nestjs-i18n';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

import type { I18nTranslations } from '../../../i18n/types/i18n.generated';
import { IsUsernameUnique } from '../decorators';
import type User from '../model/user.model';

export class UserRecordDto {
    @Exclude()
    id?: number;

    @IsString({
        message: i18nValidationMessage<I18nTranslations>('validations.string'),
    })
    @IsNotEmpty({
        message: i18nValidationMessage<I18nTranslations>('validations.not_empty'),
    })
    @MaxLength(255, {
        message: i18nValidationMessage<I18nTranslations>('validations.max'),
    })
    @ApiProperty({
        type: String,
        example: '892e7366-7ca3-40e8-8cd2-7d425c80bd3c',
    })
    uuid: string;

    @IsString({
        message: i18nValidationMessage<I18nTranslations>('validations.string'),
    })
    @IsNotEmpty({
        message: i18nValidationMessage<I18nTranslations>('validations.not_empty'),
    })
    @MaxLength(255, {
        message: i18nValidationMessage<I18nTranslations>('validations.max'),
    })
    @ApiProperty({
        type: String,
        required: true,
        maxLength: 255,
        example: 'John',
    })
    name: string;

    @IsOptional()
    @IsString({
        message: i18nValidationMessage<I18nTranslations>('validations.string'),
    })
    @MaxLength(255, {
        message: i18nValidationMessage<I18nTranslations>('validations.max'),
    })
    @ApiProperty({
        type: String,
        required: true,
        maxLength: 255,
        example: 'Doe',
    })
    surname?: string;

    @IsString({
        message: i18nValidationMessage<I18nTranslations>('validations.string'),
    })
    @IsNotEmpty({
        message: i18nValidationMessage<I18nTranslations>('validations.not_empty'),
    })
    @MaxLength(255, {
        message: i18nValidationMessage<I18nTranslations>('validations.max'),
    })
    @IsUsernameUnique()
    @Exclude({ toPlainOnly: true })
    @ApiProperty({
        type: String,
        required: true,
        maxLength: 255,
        example: 'Johndoe',
    })
    username: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        example: false,
    })
    @Type(() => Boolean)
    isBlocked?: boolean;

    @IsDate({
        message: i18nValidationMessage<I18nTranslations>('validations.date'),
    })
    @IsNotEmpty({
        message: i18nValidationMessage<I18nTranslations>('validations.not_empty'),
    })
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: true,
        example: '2023-03-01',
    })
    birthDate: Date;

    @ApiProperty({
        type: Date,
        example: '2023-03-01',
    })
    createdAt?: Date;

    @ApiProperty({
        type: Date,
        example: '2023-03-01',
    })
    updatedAt?: Date;

    /**
     * Instantiate the user record DTO.
     *
     * @param user - The user data.
     */
    constructor(user: Partial<User>) {
        Object.assign(this, user);
    }
}
