const names = require('../core/models-names');
const keys = require('../core/foreign-keys');

module.exports = (sequelize, DataTypes) => {
    const RoleStaffModel = sequelize.define(names.requestStatus, {
        name: {
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

    const roleIdConfig = {
        onDelete: "CASCADE",
        foreignKey: keys.roleId
    }

    RoleStaffModel.associate = (current, models) => {
        current.hasMany(models[names.staffer], roleIdConfig);
    };

    return RoleStaffModel;
};
