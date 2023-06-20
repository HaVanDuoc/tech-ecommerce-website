const { intervalServerError } = require("../middleware/handleError")
const { test } = require("../services/testService")

exports.test = async (req, res) => {
    try {
        const response = await test(req)
        console.log("cos vef")
        console.log("response", response)
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
