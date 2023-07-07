"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Rating extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Rating.init(
        {
            product_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            star: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            feature: DataTypes.INTEGER,
            review: DataTypes.STRING,
            liked: DataTypes.JSON,
            images: DataTypes.JSON,
        },
        {
            sequelize,
            modelName: "ratings",
        }
    )
    return Rating
}
