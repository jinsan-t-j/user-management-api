import { ApiProperty } from '@nestjs/swagger';

import { UserRecordDto } from './user-record.dto';

/**
 * DTO that specify the search User API response.
 */
export class SearchUsersResponseDto {
    @ApiProperty({
        type: String,
        description: 'Retrieved users successfully',
        example: 'The users are retrieved successfully',
    })
    message: string;

    @ApiProperty({
        type: UserRecordDto,
        isArray: true,
    })
    data: UserRecordDto[];
}
