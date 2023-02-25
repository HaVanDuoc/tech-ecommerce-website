"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      middleName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      userName: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.TEXT("long"),
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      transactionVolume: {
        type: Sequelize.STRING,
        defaultValue: "0",
      },
      genderCode: {
        type: Sequelize.STRING,
        defaultValue: "-1",
        references: {
          model: "genders",
          key: "code",
        },
      },
      statusId: {
        type: Sequelize.STRING,
        defaultValue: "STA01",
        references: {
          model: "statuses",
          key: "statusId",
        },
      },
      roleId: {
        type: Sequelize.STRING,
        defaultValue: "R001",
        references: {
          model: "roles",
          key: "roleId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
