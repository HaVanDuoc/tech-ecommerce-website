"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "Genders",
      [
        {
          code: "-1",
          name: "chưa rõ",
        },
        {
          code: "0",
          name: "ông",
        },
        {
          code: "1",
          name: "bà",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Genders", null, {});
  },
};
