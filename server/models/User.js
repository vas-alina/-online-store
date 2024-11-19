const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const roles = require("../constants/role");

const User = sequelize.define('user', {
    login: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: roles.USER
    },

})


module.exports = User;