import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO that specify the format of Delete User API Response body.
 */
export class DeleteUserResponseDto {
    @ApiProperty({
        type: String,
        description: 'User deleted successfully ',
        example: 'The user deleted successfully',
    })
    message: string;
}
