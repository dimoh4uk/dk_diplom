const names = require('../core/models-names');

module.exports = (sequelize, DataTypes) => {
    const FeedbackModel = sequelize.define(names.feedback, {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        updatedAt: false
    });

    return FeedbackModel;
};
