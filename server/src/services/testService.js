const { Gender } = require("../models")

exports.test = async (req) => {
    try {
        console.log("1")

        const response = await Gender.update({ name: "Nam" }, { where: { id: 1 } }, { raw: true })

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
