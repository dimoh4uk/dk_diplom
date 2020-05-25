const names = require('../core/models-names');

module.exports = (sequelize, DataTypes) => {
    const TourObject = sequelize.define(names.tourObject, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    return TourObject;
};
