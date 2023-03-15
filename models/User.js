const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model{};

User.init({
    username: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
            len: [10]
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

module.exports = User;