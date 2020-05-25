const names = require('../core/models-names');
const keys = require('../core/foreign-keys');

module.exports = (sequelize, DataTypes) => {
    const RequestStatusModel = sequelize.define(names.requestStatus, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    const statusIdConfig = {
        onDelete: "CASCADE",
        foreignKey: keys.statusId
    }

    RequestStatusModel.associate = (current, models) => {
        current.hasMany(models[names.serviceRequest], statusIdConfig);
        current.hasMany(models[names.excursionRequest], statusIdConfig);
    };

    return RequestStatusModel;
};
