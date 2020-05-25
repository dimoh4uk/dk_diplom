const names = require('../core/models-names');
const keys = require('../core/foreign-keys');

module.exports = (sequelize, DataTypes) => {

    const FeedbackStatusModel = sequelize.define(names.feedbackStatus, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    const feedbackStatusIdConfig = {
        onDelete: "CASCADE",
        foreignKey: keys.feedbackStatusId
    }

    FeedbackStatusModel.associate = (current, models) => {
        current.hasMany(models[names.feedback], feedbackStatusIdConfig);
    };

    return FeedbackStatusModel;
};
