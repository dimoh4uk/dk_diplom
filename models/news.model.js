const names = require('../core/models-names');

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
    }, {
        updatedAt: false
    });

    return NewsModel;
};
