import { ApiProperty } from '@nestjs/swagger';

import { UserRecordDto } from './user-record.dto';

/**
 * DTO that specify the update User API response.
 */
export class UpdateUserResponseDto {
    @ApiProperty({
        type: String,
        description: 'User updated successfully ',
        example: 'The user updated successfully',
    })
    message: string;

    @ApiProperty({
        type: UserRecordDto,
    })
    data: UserRecordDto;
}
