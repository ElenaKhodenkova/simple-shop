'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate({Product,User}) {
      this.belongsTo(Product, { foreignKey: 'productId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Cart.init({
    id: {primaryKey: true, type: [DataTypes.INTEGER]},
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};