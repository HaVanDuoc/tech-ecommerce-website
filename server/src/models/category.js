"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      categoryId: DataTypes.STRING,
      name: DataTypes.STRING,
      alias: DataTypes.STRING,
      image: DataTypes.JSON,
      view: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "categories",
    }
  );
  return Category;
};
