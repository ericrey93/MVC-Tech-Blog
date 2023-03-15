const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class Blog extends Model {};

Blog.init({
    title: {
        type: Datatypes.STRING,
        allowNull: false
    },
    content: {
        type: Datatypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
});

module.exports = Blog;
