const db = require("../models")

exports.test = async (req) => {
    try {
        console.log("1")

        const response = await db.genders.update({ name: "Nam" }, { where: { id: 1 } })

        console.log("response", response)

        console.log("2")

        return {
            err: response ? 0 : 1,
            msg: response ? "Get data successfully" : "Get data failed",
            data: response,
        }
    } catch (error) {
        return error
    }
}
