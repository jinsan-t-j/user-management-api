import { config } from 'dotenv';

config();

const databaseConfig = {
    dialect: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.PORT),
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    migrationStorageTable: 'migrations',
    seederStorageTable: 'seeders',
};

module.exports = databaseConfig;
