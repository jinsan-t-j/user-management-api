import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

/**
 * DTO that specify the format of Search User API request body.
 */
export class SearchUsersRequestDto {
    @IsOptional()
    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 24,
    })
    minAge?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 30,
    })
    maxAge?: number;
}
