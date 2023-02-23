"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addConstraint(
          "Users",
          {
            type: "foreign key",
            fields: ["genderCode"],
            references: {
              table: "genders",
              field: "code",
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
        queryInterface.removeConstraint(
          "Users",
          "Users_genderCode_foreign_idx",
          {
            transaction: t,
          }
        ),
      ]);
    });
  },
};
