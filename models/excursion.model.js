const names = require('../core/models-names');
const keys = require('../core/foreign-keys');
const helpers = require('../core/helpers');
const {DateTime} = require('luxon');

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
        date: {
            type: DataTypes.VIRTUAL,
            get: function () {
                const from = helpers.toDateFormat(DateTime, this.from);
                const to = helpers.toDateFormat(DateTime, this.to);
                return `${from} - ${to}`
            }
        },
        photoLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return helpers.createPhotoLink(this, names.excursion)
            }
        },
        detailLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return `/${names.excursion}/${this.id}`
            }
        }
    }, {
        timestamps: false,
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
