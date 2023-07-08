const { response } = require("express")
const db = require("../../models")

exports.getRevenue = async () => {
    try {
        const month = new Date().getMonth() + 1

        const revenue = async (month) => {
            const [[response]] = await db.sequelize.query(`
                select sum(total) as sum from order_details where month(createdAt) = '${month}'
            `)

            return response.sum ? response.sum : 0
        }

        const revenueCurrentMonth = await revenue(month)
        const revenuePrevMonth = await revenue(month - 1)

        let response = {}
        response["revenueCurrentMonth"] = revenueCurrentMonth
        response["revenuePrevMonth"] = revenuePrevMonth

        return {
            err: response ? 0 : 1,
            msg: response ? "Successfully" : "Failure",
            data: response,
        }
    } catch (error) {
        return error
    }
}
