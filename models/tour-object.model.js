const names = require('../core/models-names');
const helpers = require('../core/helpers');

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
        photoLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return helpers.createPhotoLink(this, names.tourObject,'picture')
            }
        },
        detailLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return `/${names.tourObject}/${this.id}`
            }
        }
    }, {
        timestamps: false
    });

    return TourObject;
};
