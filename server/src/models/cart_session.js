"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart_Session.init(
    {
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cart_sessions",
    }
  );
  return Cart_Session;
};
