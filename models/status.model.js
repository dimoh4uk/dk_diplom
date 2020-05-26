const names = require('../core/models-names');
const keys = require('../core/foreign-keys');

module.exports = (sequelize, DataTypes) => {
    const StatusModel = sequelize.define(names.requestStatus, {
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

    StatusModel.associate = (current, models) => {
        current.hasMany(models[names.serviceRequest], statusIdConfig);
        current.hasMany(models[names.excursionRequest], statusIdConfig);
        current.hasMany(models[names.feedback], statusIdConfig);
    };

    return StatusModel;
};
