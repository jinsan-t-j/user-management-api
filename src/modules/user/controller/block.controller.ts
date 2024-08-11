import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';

import { UserService } from '../services/user.service';
import {
    HandleBlockUserResponseDto,
    HandleUnBlockUserResponseDto,
    HandleBlockUserRequestDto,
} from '../dto';
import type { I18nTranslations } from '../../../i18n/types/i18n.generated';

@ApiTags('Block/Unblock User')
@ApiBearerAuth('jwt-auth')
@Controller({ path: 'users', version: '1' })
export class BlockController {
    public constructor(
        private readonly userService: UserService,
        private readonly i18n: I18nService<I18nTranslations>,
    ) {}

    @Post('block')
    @ApiOperation({ summary: 'Block a user to the database' })
    @ApiNotFoundResponse({
        description: 'User not found.',
    })
    @ApiOkResponse({
        description: 'Block a existing user record',
        type: HandleBlockUserResponseDto,
    })
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
    @ApiNotFoundResponse({
        description: 'User not found.',
    })
    @ApiOkResponse({
        description: 'Unblock a existing user record',
        type: HandleUnBlockUserResponseDto,
    })
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
