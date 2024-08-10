import { PickType } from '@nestjs/swagger';

import { UserRecordDto } from './user-record.dto';

/**
 * DTO that specify the format of Update User API request body.
 */
export class UpdateUserRequestDto extends PickType(UserRecordDto, [
    'name',
    'surname',
    'username',
    'birthDate',
]) {}
