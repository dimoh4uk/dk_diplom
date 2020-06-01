const {DateTime} = require('luxon');
const names = require('../core/models-names');
const helpers = require('../core/helpers');

module.exports = (sequelize, DataTypes) => {
    const NewsModel = sequelize.define(names.news, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo: DataTypes.STRING,
        photoLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return helpers.createPhotoLink(this, names.news)
            }
        },
        detailLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return `/${names.news}/${this.id}`
            }
        },
        date: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return helpers.toDateFormat(DateTime, this.createdAt);
            }
        },
    }, {
        updatedAt: false
    });

    return NewsModel;
};
