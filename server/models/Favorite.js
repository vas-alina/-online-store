const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = require('./User');
const Product = require('./Product');

const Favorite = sequelize.define('favorite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        },
    },
    favorite_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }

}, {
    tableName: 'favorites',
});


module.exports = Favorite;