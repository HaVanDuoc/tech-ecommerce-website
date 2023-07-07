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
      productId: DataTypes.STRING,
      name: DataTypes.STRING,
      files: DataTypes.JSON,
      price: DataTypes.STRING,
      stock: DataTypes.STRING,
      rating: DataTypes.STRING,
      discount: DataTypes.STRING,
      view: DataTypes.STRING,
      isActive: DataTypes.STRING, // 0 is active, 1 is no active
      categoryId: DataTypes.STRING,
      brandId: DataTypes.STRING,
      // specificationId: DataTypes.STRING,
      // featureId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return Product;
};
