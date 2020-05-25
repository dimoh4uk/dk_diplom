const names = require('../core/models-names');
const keys = require('../core/foreign-keys');

module.exports = (sequelize, DataTypes) => {
    const CulturalInstitutionModel = sequelize.define(names.culturalInstitution, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: false
    });

    const culturalInstitutionIdConfig = {
        foreignKey: keys.culturalInstitutionId,
    }

    CulturalInstitutionModel.associate = (current, models) => {
        current.hasMany(models[names.department], culturalInstitutionIdConfig);
        current.hasMany(models[names.activity], culturalInstitutionIdConfig);
        current.hasMany(models[names.news], culturalInstitutionIdConfig);
    };

    return CulturalInstitutionModel;
};

