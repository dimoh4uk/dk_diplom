const names = require('../core/models-names');
const keys = require('../core/foreign-keys');

module.exports = (sequelize, DataTypes) => {
    const RoleStaffModel = sequelize.define(names.role, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    const roleIdConfig = {
        foreignKey: keys.roleId
    }

    RoleStaffModel.associate = (current, models) => {
        current.hasMany(models[names.staffer], roleIdConfig);
    };

    return RoleStaffModel;
};
