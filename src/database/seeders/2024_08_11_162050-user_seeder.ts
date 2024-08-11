import type { Migration } from 'sequelize-cli';
import { nanoid } from 'nanoid';

const TABLE_NAME = 'users';

const seeder: Migration = {
    /**
     * Up function for seeder.
     *
     * @param queryInterface - Query Interface instance.
     */
    async up(queryInterface) {
        console.log('setting up')
        /**
         * Seeder up code here
         */
        await queryInterface.bulkInsert(TABLE_NAME, [
            {
                uuid: nanoid(32),
                name: "Jinsan",
                surname: "TJ",
                username: "jinsantj",
                birthDate: "2000-03-01",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    /**
     * Down function for seeder.
     *
     * @param queryInterface - Query Interface instance.
     */
    async down(queryInterface) {
        /**
         * Seeder down code here
         */

        await queryInterface.bulkDelete(TABLE_NAME, {
            username: 'jinsantj'
        });
    },
};

module.exports = seeder;
