const names = require('../core/models-names');
const helpers = require('../core/helpers');
const {DateTime} = require('luxon');

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
        createdAtDate: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return helpers.toDateFormat(DateTime, this.createdAt);
            }
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
                return helpers.createPhotoLink(this, names.activity)
            }
        },
        detailLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return `/${names.activity}/${this.id}`
            }
        },
    }, {
        timestamps: false
    });

    return ActivityModel;
};

