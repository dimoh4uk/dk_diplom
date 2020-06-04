const names = require('../core/models-names');
const keys = require('../core/foreign-keys');
const helpers = require('../core/helpers');

module.exports = (sequelize, DataTypes) => {
    const ServiceModel = sequelize.define(names.service, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        detailLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return `/${names.service}/${this.id}`
            }
        }
    }, {
        updatedAt: false
    });

    const serviceIdConfig = {
        onDelete: "CASCADE",
        foreignKey: keys.serviceId
    }

    ServiceModel.associate = (current, models) => {
        current.hasMany(models[names.serviceRequest], serviceIdConfig);
    };

    return ServiceModel;
};
