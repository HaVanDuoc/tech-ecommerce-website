"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  brand.init(
    {
      brandId: DataTypes.STRING,
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      categoryId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "brand",
    }
  );
  return brand;
};
