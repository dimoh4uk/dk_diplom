const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const DB_CONFIG = {
    userName: 'DBAdmin',
    password: '123',
    sampleDbName: 'TEST_BD',
    hostName: 'localhost'
};

const MSSQL_CONFIG = {
    hostName: 'localhost',
    dialect: 'mssql'
}

const DB_INSTANCE_NAME = 'SQLTEST';

const sequelize = new Sequelize(
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


fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db[modelName], db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;