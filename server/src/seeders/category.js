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
      "Categories",
      [
        {
          name: "điện thoại",
        },
        {
          name: "tablet",
        },
        {
          name: "laptop",
        },
        {
          name: "phụ kiện",
        },
        {
          name: "đồng hồ thông minh",
        },
        {
          name: "đồng hồ thời trang",
        },
        {
          name: "pc",
        },
        {
          name: "sim",
        },
        {
          name: "thẻ cào",
        },
        {
          name: "chưa rõ",
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

    return await queryInterface.bulkDelete("Categories", null, {});
  },
};
