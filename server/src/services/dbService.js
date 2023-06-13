// authService.js

const db = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { padUserId } = require("../helper/padLeft")
const { hashPassword } = require("../helper/hashPassword")
const { sequelize } = require("../models")

exports.ListTables = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const [response] = await sequelize.query("SHOW tables")

            resolve({
                err: response ? 0 : 1,
                msg: response ? "Get data successfully" : "Get data failure",
                data: response,
            })
        } catch (error) {
            reject(error)
        }
    })

// List Category
exports.listCategory = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Category.findAll(
                { attributes: { exclude: ["createdAt", "updatedAt"] } },
                { raw: true }
            )

            resolve({
                err: response ? 0 : 1,
                msg: response ? "Get data successfully" : "Get data failure",
                data: response,
            })
        } catch (error) {
            reject(error)
        }
    })
