"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_Detail.init(
    {
      user_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      code: DataTypes.UUID,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "order_details",
    }
  );
  return Order_Detail;
};
