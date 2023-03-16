const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class Blog extends Model {};

Blog.init({
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Datatypes.STRING,
        allowNull: false
    },
    content: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    user_id: {
        id: Datatypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }

}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
});

module.exports = Blog;
