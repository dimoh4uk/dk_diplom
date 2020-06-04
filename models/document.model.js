const names = require('../core/models-names');
const helpers = require('../core/helpers');

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
        documentLink: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return helpers.createFileLink(this.id, this.link)
            }
        },
    }, {
        updatedAt: false
    });

    return DocumentModel;
};
