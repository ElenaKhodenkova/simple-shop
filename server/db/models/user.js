'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Product, Cart}) {
      this.belongsToMany(Product, {
        through: {
          model: Cart,
        },
        foreignKey: 'productId'
      });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};