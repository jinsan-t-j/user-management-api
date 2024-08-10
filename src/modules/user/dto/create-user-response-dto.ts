import { ApiProperty } from '@nestjs/swagger';

import { UserRecordDto } from './user-record.dto';

/**
 * DTO that specify the Create User API response.
 */
export class CreateUserResponseDto {
    @ApiProperty({
        type: String,
        description: 'Created user successfully ',
        example: 'The user is created successfully',
    })
    message: string;

    @ApiProperty({
        type: UserRecordDto,
    })
    data: Omit<UserRecordDto, 'id'>;
}
