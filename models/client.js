const {DataTypes, Model} = require('sequelize');
const sequelize = require('../core/instance.sequelize');

class Client extends Model {

}

Client.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "user"
});
// await Client.sync({force: true});
module.exports = Client;