const names = require('../core/models-names');

module.exports = (sequelize, DataTypes) => {
    const StafferModel = sequelize.define(names.staffer, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    return StafferModel;
};
