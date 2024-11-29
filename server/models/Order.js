const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = require('./User');
// const Cart = require('./Cart')

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



// Order.belongsTo(User, { foreignKey: 'user_id' });
// User.hasMany(Order, { foreignKey: 'user_id' });
// Order.hasMany(Cart, { foreignKey: 'order_id' });

module.exports = Order;