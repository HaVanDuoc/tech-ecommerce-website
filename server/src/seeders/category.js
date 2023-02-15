"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Category", [
      {
        name: "mobile",
      },
      {
        name: "tablet",
      },
      {
        name: "laptop",
      },
      {
        name: "accessory",
      },
      {
        name: "smartwatch",
      },
      {
        name: "watch",
      },
      {
        name: "pc",
      },
      {
        name: "sim",
      },
      {
        name: "card",
      },
      {
        name: "other",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Category", null, {});
  },
};
