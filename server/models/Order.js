const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');


const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    delivery_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    comment_order: {
        type: DataTypes.STRING,
        allowNull: true,
    }

}, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: "updated_at",
});


module.exports = Order;