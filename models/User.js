const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
class User extends Model{};

User.init({
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
            len: [6]
        }
     }
  }, 
{
    hooks: {
        async beforeCreate(newUser) {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            return newUser;
        },
        async beforeUpdate(updatedUser) {
            updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
            return updatedUser;
        }
    },

    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

module.exports = User;