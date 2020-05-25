const names = require('../core/models-names');

module.exports = (sequelize, DataTypes) => {
    const DocumentModel = sequelize.define(names.document, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        updatedAt: false
    });

    return DocumentModel;
};
