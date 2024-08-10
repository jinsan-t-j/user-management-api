import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CqrsModule } from '@nestjs/cqrs';

import { User } from './model/user.model';
import { UserStore } from './stores/user.store';
import { userQueryHandlers } from './queries/handlers';
import { userValidators } from './validators';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { userCommandHandlers } from './commands/handlers';
import { BlockController } from './controller/block.controller';

@Module({
    imports: [CqrsModule, SequelizeModule.forFeature([User])],
    controllers: [UserController, BlockController],
    providers: [
        UserService,
        UserStore,
        ...userCommandHandlers,
        ...userQueryHandlers,
        ...userValidators,
    ],
})
export class UserModule {}
