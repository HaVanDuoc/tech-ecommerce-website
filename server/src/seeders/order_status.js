"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "order_statuses",
      [
        {
          status: "Chờ xác nhận",
        },
        {
          status: "Chờ lấy hàng",
        },
        {
          status: "Đang giao",
        },
        {
          status: "Đã giao",
        },
        {
          status: "Đã hủy",
        },
        {
          status: "Trả hàng",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("order_statuses", null, {});
  },
};
