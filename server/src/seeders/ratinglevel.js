"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "ratinglevels",
            [
                {
                    name: "Kém",
                },
                {
                    name: "Tốt",
                },
                {
                    name: "Cực ngon",
                },
            ],
            {}
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("ratinglevels", null, {})
    },
}
