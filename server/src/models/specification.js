"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Specification.init(
    {
      specificationId: DataTypes.STRING,
      name: DataTypes.STRING,
      categoryId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Specification",
    }
  );
  return Specification;
};
