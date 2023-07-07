"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            userId: DataTypes.STRING,
            firstName: DataTypes.STRING,
            middleName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            userName: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            dateOfBirth: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            address: DataTypes.STRING,
            transactionVolume: DataTypes.STRING,
            genderCode: DataTypes.STRING,
            statusId: DataTypes.STRING,
            roleId: DataTypes.STRING,
            code_verify: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "user",
        }
    )
    return User
}
