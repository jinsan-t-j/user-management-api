import { Body, Controller, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';

import { UserService } from '../services/user.service';
import type { HandleBlockUserResponseDto, HandleUnBlockUserResponseDto } from '../dto';
import { HandleBlockUserRequestDto } from '../dto';
import type { I18nTranslations } from '../../../i18n/types/i18n.generated';

@ApiTags('Block/Unblock User')
@Controller({ path: 'user', version: '1' })
export class BlockController {
    public constructor(
        private readonly userService: UserService,
        private readonly i18n: I18nService<I18nTranslations>,
    ) {}

    @Post('block')
    @ApiOperation({ summary: 'Block a user to the database' })
    @ApiNotFoundResponse()
    async block(
        @Body() blockUserDto: HandleBlockUserRequestDto,
    ): Promise<HandleBlockUserResponseDto> {
        await this.userService.handleBlock(blockUserDto.uuid, true);

        return {
            message: this.i18n.t('messages.common.blocked', {
                args: { entity: this.i18n.t('terms.user') },
            }),
        };
    }

    @Post('unblock')
    @ApiOperation({ summary: 'Unblock a user to the database' })
    @ApiNotFoundResponse()
    async unblock(
        @Body() blockUserDto: HandleBlockUserRequestDto,
    ): Promise<HandleUnBlockUserResponseDto> {
        await this.userService.handleBlock(blockUserDto.uuid, false);

        return {
            message: this.i18n.t('messages.common.unblocked', {
                args: { entity: this.i18n.t('terms.user') },
            }),
        };
    }
}
