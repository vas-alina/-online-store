const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Product = require('./Product');

const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // authorId: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     references: {
    //         model: User,
    //         key: 'id'
    //     }
    // },

});
// Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
module.exports = Comment;