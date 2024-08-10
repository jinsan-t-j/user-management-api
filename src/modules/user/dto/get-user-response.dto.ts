import { ApiProperty } from '@nestjs/swagger';

import { UserRecordDto } from './user-record.dto';

/**
 * DTO that specify the Create User API response.
 */
export class GetUserResponseDto {
    @ApiProperty({
        type: String,
        description: 'Retrieved user successfully',
        example: 'The user is Retrieved successfully',
    })
    message: string;

    @ApiProperty({
        type: UserRecordDto,
    })
    data: UserRecordDto;
}
