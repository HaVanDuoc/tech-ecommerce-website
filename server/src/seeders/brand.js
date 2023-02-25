"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "Brands",
      [
        // Điện thoại
        {
          brandId: "M001",
          name: "iPhone",
          logo: "",
          categoryId: "C001",
        },
        {
          brandId: "M002",
          name: "Samsung",
          logo: "",
          categoryId: "C001",
        },
        {
          brandId: "M003",
          name: "Oppo",
          logo: "",
          categoryId: "C001",
        },
        {
          brandId: "M004",
          name: "Vivo",
          logo: "",
          categoryId: "C001",
        },
        {
          brandId: "M005",
          name: "Xiaomi",
          logo: "",
          categoryId: "C001",
        },
        {
          brandId: "M006",
          name: "Realme",
          logo: "",
          categoryId: "C001",
        },
        {
          brandId: "M007",
          name: "Nokia",
          logo: "",
          categoryId: "C001",
        },
        {
          brandId: "M008",
          name: "Nokia",
          logo: "",
          categoryId: "C001",
        },
        // Laptop
        {
          brandId: "M009",
          name: "MacBook",
          logo: "",
          categoryId: "C003",
        },
        {
          brandId: "M010",
          name: "Asus",
          logo: "",
          categoryId: "C003",
        },
        {
          brandId: "M011",
          name: "Hp",
          logo: "",
          categoryId: "C003",
        },
        {
          brandId: "M012",
          name: "Lenovo",
          logo: "",
          categoryId: "C003",
        },
        {
          brandId: "M013",
          name: "Acer",
          logo: "",
          categoryId: "C003",
        },
        {
          brandId: "M014",
          name: "Dell",
          logo: "",
          categoryId: "C003",
        },
        {
          brandId: "M015",
          name: "Msi",
          logo: "",
          categoryId: "C003",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Brands", null, {});
  },
};
