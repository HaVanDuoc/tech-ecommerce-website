"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "Genders",
      [
        {
          code: "0",
          name: "Nam",
        },
        {
          code: "1",
          name: "Nữ",
        },
        {
          code: "-1",
          name: "Chưa rõ",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Genders", null, {});
  },
};
