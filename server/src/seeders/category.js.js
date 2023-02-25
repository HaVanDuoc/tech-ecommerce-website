"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "Categories",
      [
        {
          categoryId: "C001",
          name: "Điện thoại",
        },
        {
          categoryId: "C002",
          name: "Tablet",
        },
        {
          categoryId: "C003",
          name: "Laptop",
        },
        {
          categoryId: "C004",
          name: "Phụ kiện",
        },
        {
          categoryId: "C005",
          name: "Đồng hồ",
        },
        {
          categoryId: "C006",
          name: "Pc",
        },
        {
          categoryId: "C007",
          name: "Sim",
        },
        {
          categoryId: "C008",
          name: "thẻ cào",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Categories", null, {});
  },
};
