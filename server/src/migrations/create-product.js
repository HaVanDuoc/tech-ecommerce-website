"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.STRING,
        references: {
          model: "categories",
          key: "categoryId",
        },
      },
      manufacturerId: {
        type: Sequelize.STRING,
        references: {
          model: "Manufacturers",
          key: "manufacturerId",
        },
      },
      specificationId: {
        type: Sequelize.STRING,
        references: {
          model: "Specifications",
          key: "specificationId",
        },
      },
      featureId: {
        type: Sequelize.STRING,
        references: {
          model: "Features",
          key: "featureId",
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
    await queryInterface.dropTable("Products");
  },
};
