import { ApiProperty } from '@nestjs/swagger';

import { UserRecordDto } from './user-record.dto';

/**
 * DTO that specify the Create User API response.
 */
export class ListUsersResponseDto {
    @ApiProperty({
        type: String,
        description: 'Retrieved users successfully',
        example: 'All the users are retrieved successfully',
    })
    message: string;

    @ApiProperty({
        type: UserRecordDto,
        isArray: true,
    })
    data: UserRecordDto[];
}
