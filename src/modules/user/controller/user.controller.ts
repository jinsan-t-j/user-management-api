import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { UserService } from '../services/user.service';
import type { SearchUsersResponseDto } from '../dto';
import {
    CreateUserRequestDto,
    CreateUserResponseDto,
    DeleteUserResponseDto,
    GetUserResponseDto,
    ListUsersResponseDto,
    UpdateUserRequestDto,
    UpdateUserResponseDto,
} from '../dto';
import type { I18nTranslations } from '../../../i18n/types/i18n.generated';
import { SearchUsersRequestDto } from '../dto/search-users-request-dto';
import { Public } from '../../../shared/decorators';

@ApiTags('User')
@ApiBearerAuth('jwt-auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'user', version: '1' })
export class UserController {
    public constructor(
        private readonly userService: UserService,
        private readonly i18n: I18nService<I18nTranslations>,
    ) {}

    @Public()
    @Post()
    @ApiOperation({ summary: 'Create a user to the database' })
    @ApiCreatedResponse({
        description: 'Create a new user record',
        type: CreateUserResponseDto,
    })
    async create(@Body() createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
        const data = await this.userService.create(createUserDto);

        return {
            message: this.i18n.t('messages.common.created', {
                args: { entity: this.i18n.t('terms.user') },
            }),
            data,
        };
    }

    @Public()
    @Get()
    @ApiOperation({ summary: 'List of users' })
    @ApiOkResponse({
        description: 'Retrieve list of users available in the system',
        type: ListUsersResponseDto,
    })
    @ApiNoContentResponse({ description: 'No users found' })
    @UseInterceptors(CacheInterceptor)
    async findAll(): Promise<ListUsersResponseDto> {
        const data = await this.userService.findAll();

        return {
            message: this.i18n.t('messages.common.retrieved', {
                args: { entity: this.i18n.t('terms.user') },
            }),
            data,
        };
    }

    @Public()
    @Get(':uuid')
    @ApiOperation({ summary: 'Get a user' })
    @ApiOkResponse({
        description: 'Retrieve single user details',
        type: GetUserResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'User not found.',
    })
    @UseInterceptors(CacheInterceptor)
    async findOne(@Param('uuid') uuid: string): Promise<GetUserResponseDto> {
        const data = await this.userService.findOne(uuid);

        return {
            message: this.i18n.t('messages.common.retrieved', {
                args: { entity: this.i18n.t('terms.user') },
            }),
            data,
        };
    }

    @Public()
    @Patch(':uuid')
    @ApiOperation({ summary: 'Update a user' })
    @ApiCreatedResponse({
        description: 'Modify existing user record',
        type: UpdateUserResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'User not found.',
    })
    async update(
        @Param('uuid') uuid: string,
        @Body() updateUserDto: UpdateUserRequestDto,
    ): Promise<UpdateUserResponseDto> {
        const data = await this.userService.update(updateUserDto, uuid);

        return {
            message: this.i18n.t('messages.common.updated', {
                args: { entity: this.i18n.t('terms.user') },
            }),
            data,
        };
    }

    @Public()
    @Delete(':uuid')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiOkResponse({
        description: 'Delete a existing user record',
        type: DeleteUserResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'User not found.',
    })
    async delete(@Param('uuid') uuid: string): Promise<DeleteUserResponseDto> {
        await this.userService.deleteByUuid(uuid);

        return {
            message: this.i18n.t('messages.common.deleted', {
                args: { entity: this.i18n.t('terms.user') },
            }),
        };
    }

    @Post('search/')
    @ApiOperation({ summary: 'Search a user in the database' })
    @ApiQuery({ name: 'username', required: false, type: String })
    @ApiBody({ type: SearchUsersRequestDto, required: false })
    @ApiNoContentResponse({ description: 'No users found' })
    @UseInterceptors(CacheInterceptor)
    async search(
        @Body() searchUsersRequestDto?: SearchUsersRequestDto,
        @Query('username') username?: string,
    ): Promise<SearchUsersResponseDto> {
        const data = await this.userService.search(searchUsersRequestDto, username);

        return {
            message: this.i18n.t('messages.common.retrieved', {
                args: { entity: this.i18n.t('terms.user') },
            }),
            data,
        };
    }
}
