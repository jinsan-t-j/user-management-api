import { Injectable } from '@nestjs/common';
import { Op, type Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../model/user.model';
import type { UserRecordDto } from '../dto';
import type { ISearchProps } from '../queries/types';

/**
 * The user store.
 */
@Injectable()
export class UserStore {
    /**
     * Instantiate the UserStore class.
     *
     * @param userModel - The user model instance.
     */
    public constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) {}

    /**
     * Write new user to the database.
     *
     * @param data - The user record payload.
     * @param t - The DB transaction.
     * @returns The newly created user.
     */
    public async createUser(data: Omit<UserRecordDto, 'uuid'>, t?: Transaction) {
        return await this.userModel.create({ ...data }, { transaction: t });
    }

    /**
     * Get the user by uuid.
     *
     * @param uuid - The uuid of the user.
     * @returns The user record database if found else null.
     */
    public async findOneByUuid(uuid: string): Promise<User | null> {
        return await this.userModel.findOne({
            attributes: ['uuid', 'name', 'surname', 'birthDate', 'createdAt', 'updatedAt'],
            where: { uuid },
        });
    }

    /**
     * Get the user by username.
     *
     * @param username - The username of the user.
     * @returns The user record database if found else null.
     */
    public async findOneByUsername(username: string): Promise<User | null> {
        return await this.userModel.findOne({
            attributes: [
                'uuid',
                'name',
                'surname',
                'username',
                'birthDate',
                'createdAt',
                'updatedAt',
            ],
            where: { username },
        });
    }

    /**
     * Get the user by uuid.
     *
     * @returns The user record database if found else null.
     */
    public async findAll(): Promise<User[] | null> {
        return await this.userModel.findAll({
            attributes: ['uuid', 'name', 'surname', 'birthDate', 'createdAt', 'updatedAt'],
        });
    }

    /**
     * Get the user by uuid.
     *
     * @param data - The user record payload.
     * @param t - The DB transaction.
     * @returns The user record database if found else null.
     */
    public async update(
        data: Pick<UserRecordDto, 'uuid' | 'name' | 'surname' | 'birthDate'>,
        t?: Transaction,
    ): Promise<[affectedCount: number]> {
        return await this.userModel.update(
            { ...data },
            { where: { uuid: data.uuid }, transaction: t },
        );
    }

    /**
     * Get the user by uuid.
     *
     * @param data - The data containing the username, min birth date, max birth date.
     * @returns The user record database if found else null.
     */
    public async search(data: ISearchProps): Promise<User[]> {
        return await this.userModel.findAll({
            where: {
                ...(data.username && { username: { [Op.iLike]: `%${data.username}%` } }),
                ...((data.birthDateOnMaxAge || data.birthDateOnMinAge) && {
                    birthDate: {
                        ...(data.birthDateOnMaxAge && { [Op.gte]: data.birthDateOnMaxAge }),
                        ...(data.birthDateOnMinAge && { [Op.lte]: data.birthDateOnMinAge }),
                    },
                    isBlocked: false,
                }),
            },
        });
    }

    /**
     * Get the user by uuid.
     *
     * @param uuid - The user record payload.
     * @param t - The DB transaction.
     * @returns The user record database if found else null.
     */
    public async delete(uuid: string, t?: Transaction): Promise<number> {
        return await this.userModel.destroy({
            where: { uuid },
            transaction: t,
        });
    }

    /**
     * Handle the block or un.
     *
     * @param uuid - The uuid of the user.
     * @param isBlocked - To determine the user is whether blocked or not.
     * @param t - The transaction.
     * @returns The affected rows.
     */
    public async handleBlock(
        uuid: string,
        isBlocked: boolean,
        t?: Transaction,
    ): Promise<[affectedCount: number]> {
        return await this.userModel.update({ isBlocked }, { where: { uuid }, transaction: t });
    }
}
