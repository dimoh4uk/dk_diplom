const names = require('../core/models-names');
const helpers = require('../core/helpers');

module.exports = (sequelize, DataTypes) => {
    const CulturalObject = sequelize.define(names.culturalObject, {
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
                return helpers.createPhotoLink(this, names.culturalObject, 'picture')
            }
        },
        detailLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return `/districtCulture/${names.culturalObject}/${this.id}`
            }
        }
    }, {
        timestamps: false
    });

    return CulturalObject;
};
