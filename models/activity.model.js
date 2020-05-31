const names = require('../core/models-names');
const helpers = require('../core/helpers');

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
        photoLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return helpers.createPhotoLink(this, names.activity)
            }
        }
    }, {
        timestamps: false
    });

    return ActivityModel;
};

