"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Categories",
          "illustration",
          {
            type: Sequelize.DataTypes.TEXT('long'),
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Categories",
          "accessTime",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Categories",
          "link",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Categories", "illustration", {
          transaction: t,
        }),
        queryInterface.removeColumn("Categories", "accessTime", {
          transaction: t,
        }),
        queryInterface.removeColumn("Categories", "link", {
          transaction: t,
        }),
      ]);
    });
  },
};
