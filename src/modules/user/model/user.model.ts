import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { nanoid } from 'nanoid';
import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'users',
    defaultScope: {
        attributes: {
            exclude: ['username'],
        },
    },
    scopes: {
        withUsername: {
            attributes: ['username'],
        },
    },
})
@UseInterceptors(ClassSerializerInterceptor)
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Exclude()
    @Column({ type: DataType.INTEGER })
    id: number;

    @Column({
        type: DataType.STRING,
        defaultValue: () => nanoid(32),
        allowNull: false,
        field: 'uuid',
        unique: true,
    })
    uuid: number;

    /**
     * The name of the user.
     */
    @Column({ type: DataType.STRING, allowNull: false, field: 'name' })
    name: string;

    /**
     * The surname of the user.
     */
    @Column({ type: DataType.STRING, allowNull: true, field: 'surname' })
    surname?: string;

    /**
     * The username of the user.
     */
    @Exclude()
    @Column({ type: DataType.STRING, allowNull: false, field: 'username', unique: true })
    username: string;

    /**
     * The date of birth of the user.
     */
    @Column({ field: 'birth_date', allowNull: true, type: DataType.DATEONLY })
    birthDate?: Date;

    /**
     * The is blocked column of the user.
     */
    @Column({ field: 'is_blocked', defaultValue: () => false, type: DataType.BOOLEAN })
    isBlocked?: boolean;

    /**
     * The date & time of the record created.
     */
    @CreatedAt
    @Column({ allowNull: false, field: 'created_at', type: DataType.DATE })
    createdAt: Date;

    /**
     * The date & time of the record updated.
     */
    @UpdatedAt
    @Column({ allowNull: false, field: 'updated_at', type: DataType.DATE })
    updatedAt: Date;
}
