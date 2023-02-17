"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class manufacturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  manufacturer.init(
    {
      manufacturerId: DataTypes.STRING,
      name: DataTypes.STRING,
      categoryId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "manufacturer",
    }
  );
  return manufacturer;
};
