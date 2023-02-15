"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return await queryInterface.bulkInsert(
      "Roles",
      [
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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete('Roles', null, {});
  },
};
