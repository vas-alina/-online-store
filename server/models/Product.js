const { DataTypes, Sequelize } = require('sequelize');
const validator = require('validator');
const sequelize = require('../db');
const Comment = require('./Comment');


const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },

  img_url: {
    type: DataTypes.STRING,
    validate: {
      isValidUrl(value) {
        if (!validator.isURL(value)) {
          throw new Error('Image should be a valid URL');
        }
      }
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  form: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  width: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  length: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  }

}, {
  tableName: 'products',
  timestamps: false,
});



Product.hasMany(Comment, { foreignKey: 'productId', as: 'comments' });
Comment.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Product;