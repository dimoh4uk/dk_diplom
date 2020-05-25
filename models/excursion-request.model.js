const names = require('../core/models-names');

module.exports = (sequelize, DataTypes) => {
    const ExcursionRequestModel = sequelize.define(names.excursionRequest, {
        clientName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        updatedAt: false
    });

    return ExcursionRequestModel;
};
