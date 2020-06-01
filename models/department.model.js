const names = require('../core/models-names');
const keys = require('../core/foreign-keys');

module.exports = (sequelize, DataTypes) => {
    const DepartmentModel = sequelize.define(names.department, {
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
        },
        detailLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return `/${names.department}/${this.id}`
            }
        }
    }, {
        timestamps: false
    });

    const departmentIdConfig = {
        foreignKey: keys.departmentId,
    }

    DepartmentModel.associate = (current, models) => {
        current.hasMany(models[names.staffer], departmentIdConfig);
        current.hasMany(models[names.document], departmentIdConfig);
        current.hasMany(models[names.service], departmentIdConfig);
        current.hasMany(models[names.activity], departmentIdConfig);
        current.hasMany(models[names.news], departmentIdConfig);
        current.hasMany(models[names.excursion], departmentIdConfig);
    };

    return DepartmentModel;
};

