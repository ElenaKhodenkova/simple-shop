'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
      static associate({User, Cart}) {
        this.belongsToMany(User, {
          through: {
            model: Cart,
          },
          foreignKey: 'userId'
        });
      }
    }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};