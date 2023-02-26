"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Products",
          "stock",
          {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "0",
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Products",
          "isActive",
          {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "0",
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Products", "stock", {
          transaction: t,
        }),
        queryInterface.removeColumn("Products", "isActive", {
          transaction: t,
        }),
      ]);
    });
  },
};
