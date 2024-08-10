import { PickType } from '@nestjs/swagger';

import { UserRecordDto } from './user-record.dto';

/**
 * DTO that specify the format of Create User API request body.
 */
export class CreateUserRequestDto extends PickType(UserRecordDto, [
    'name',
    'surname',
    'username',
    'birthDate',
]) {}
