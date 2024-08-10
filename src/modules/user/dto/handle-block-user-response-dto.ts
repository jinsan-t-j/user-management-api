import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO that specify the format of Delete User API Response body.
 */
export class HandleBlockUserResponseDto {
    @ApiProperty({
        type: String,
        description: 'User blocked successfully ',
        example: 'The user blocked successfully',
    })
    message: string;
}
