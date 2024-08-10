import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO that specify the format of unblock user API Response body.
 */
export class HandleUnBlockUserResponseDto {
    @ApiProperty({
        type: String,
        description: 'User unblocked successfully ',
        example: 'The user is unblocked successfully',
    })
    message: string;
}
