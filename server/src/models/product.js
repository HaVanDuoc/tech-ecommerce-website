"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      manufacturer_id: DataTypes.INTEGER,
      specification_id: DataTypes.INTEGER,
      feature_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
