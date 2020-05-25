const names = require('../core/models-names');
const keys = require('../core/foreign-keys');

module.exports = (sequelize, DataTypes) => {
    const ExcursionModel = sequelize.define(names.excursion, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        from: {
            type: DataTypes.DATE,
            allowNull: false
        },
        to: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: DataTypes.STRING,
        limitations: DataTypes.STRING,
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        updatedAt: false
    });

    const excursionIdConfig = {
        onDelete: "cascade",
        foreignKey: keys.excursionId,
    };

    ExcursionModel.associate = (current, models) => {
        current.hasMany(models[names.excursionRequest], excursionIdConfig);
    };

    return ExcursionModel;
};
