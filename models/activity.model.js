const names = require('../core/models-names');

module.exports = (sequelize, DataTypes) => {
    const ActivityModel = sequelize.define(names.activity, {
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
        description: DataTypes.TEXT,
        price: DataTypes.STRING,
        limitations: DataTypes.STRING,
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    return ActivityModel;
};

