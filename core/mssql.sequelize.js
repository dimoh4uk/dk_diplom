const Sequelize = require('sequelize');

const DB_CONFIG = {
    userName: 'TEST_DB',
    password: '123',
    sampleDbName: 'TEST_BD',
    // hostName: 'localhost'
};

const MSSQL_CONFIG = {
    hostName: 'localhost',
    dialect: 'mssql'
}

const DB_INSTANCE_NAME = 'SQLEXPRESS';

module.exports = new Sequelize(
    DB_CONFIG.sampleDbName,
    DB_CONFIG.userName,
    DB_CONFIG.password,
    {
        dialect: MSSQL_CONFIG.dialect,
        host: MSSQL_CONFIG.hostName,
        dialectOptions: {
            requestTimeout: 30000,
            options: {
                instanceName: DB_INSTANCE_NAME,
            }
        }
    },
);
