"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Category",
          key: "id",
        },
      },
      manufacturer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Manufacturer",
          key: "id",
        },
      },
      specification_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Specification",
          key: "id",
        },
      },
      feature_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Feature",
          key: "id",
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
    await queryInterface.dropTable("Product");
  },
};
