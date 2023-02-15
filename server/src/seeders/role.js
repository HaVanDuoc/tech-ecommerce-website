"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Role", [
      {
        name: "khách hàng",
      },
      {
        name: "lập trình viên",
      },
      {
        name: "nhân viên",
      },
      {
        name: "quản lý",
      },
      {
        name: "giám đốc",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
