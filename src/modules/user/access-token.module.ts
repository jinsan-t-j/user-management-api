import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { userCommandHandlers } from './commands/handlers';
import { UserService } from './services/user.service';
import { User } from './model/user.model';
import { UserStore } from './stores/user.store';
import { userQueryHandlers } from './queries/handlers';
import { UserController } from './controller/user.controller';

@Module({
    imports: [CqrsModule, ConfigModule, SequelizeModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UserStore, ...userCommandHandlers, ...userQueryHandlers],
})
export class AccessTokenModule {}
