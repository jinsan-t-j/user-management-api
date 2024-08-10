import type { Migration } from 'sequelize-cli';

/**
 * Name of the table
 */
const TABLE_NAME = 'users';

/**
 * Custom sequelize migration template
 */
const migration: Migration = {
    /**
     * The up function for migration.
     *
     * @param queryInterface - Query Interface instance.
     * @param sequelize - Sequelize instance.
     */
    async up(queryInterface, sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable(
                TABLE_NAME,
                {
                    id: {
                        primaryKey: true,
                        autoIncrement: true,
                        type: sequelize.DataTypes.INTEGER(),
                    },
                    uuid: {
                        type: sequelize.DataTypes.STRING,
                        allowNull: false,
                        unique: false,
                    },
                    name: {
                        type: sequelize.DataTypes.STRING(),
                        allowNull: false,
                    },
                    surname: {
                        type: sequelize.DataTypes.STRING(),
                        allowNull: true,
                    },
                    username: {
                        type: sequelize.DataTypes.STRING(),
                        allowNull: false,
                        unique: true
                    },
                    birth_date: {
                        type: sequelize.DataTypes.DATEONLY(),
                        allowNull: false,
                    },
                    is_blocked: {
                        type: sequelize.DataTypes.BOOLEAN(),
                        allowNull: false,
                        defaultValue: false,
                    },
                    created_at: {
                        type: sequelize.DataTypes.DATE,
                        allowNull: false,
                    },
                    updated_at: {
                        type: sequelize.DataTypes.DATE,
                        allowNull: false,
                    },
                },
                { transaction },
            );

            // Commit the transaction
            await transaction.commit();
        } catch (err) {
            // Rollback the transaction
            await transaction.rollback();
            throw err;
        }
    },

    /**
     * The down function for migration.
     *
     * @param queryInterface - Query Interface instance.
     */
    async down(queryInterface) {
        /**
         * Drop existing table from the database
         */
        await queryInterface.dropTable(TABLE_NAME);
    },
};

module.exports = migration;
