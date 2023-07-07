"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Brand.init(
    {
      brandId: DataTypes.STRING,
      name: DataTypes.STRING,
      image: DataTypes.JSON,
      link: DataTypes.STRING,
      view: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "brands",
    }
  );
  return Brand;
};
