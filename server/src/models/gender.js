"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Gender extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Gender.init(
        {
            code: DataTypes.STRING,
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "genders",
        }
    )
    return Gender
}
