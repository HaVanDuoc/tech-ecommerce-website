"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Users",
          "genderCode",
          {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "-1",
            references: {
              model: "genders",
              key: "code",
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Users", "genderCode", {
          transaction: t,
        }),
      ]);
    });
  },
};
