'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categorybrand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  categorybrand.init({
    categoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'categorybrands',
  });
  return categorybrand;
};