"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Ratings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            star: {
                type: Sequelize.INTEGER,
            },
            review: {
                type: Sequelize.STRING,
            },
            liked: {
                type: Sequelize.JSON,
            },
            images: {
                type: Sequelize.JSON,
            },
            quantity: {
                type: Sequelize.INTEGER,
                references: {
                    model: "ratinglevels",
                    key: "id",
                },
            },
            feature: {
                type: Sequelize.INTEGER,
                references: {
                    model: "ratinglevels",
                    key: "id",
                },
            },
            product_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Products",
                    key: "id",
                },
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Ratings")
    },
}
