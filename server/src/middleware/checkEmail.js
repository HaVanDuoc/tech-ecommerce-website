const db = require("../models")

const checkEmail = async (req, res, next) => {
    const email = req.body.email

    const requestCheck = async () => {
        return await db.user.findOne({
            where: { email },
            raw: true,
        })
    }

    if (email) {
        const response = await requestCheck()

        if (response) {
            return res.status(200).json({
                err: 1,
                msg: "Email này đã được đăng ký!",
            })
        }
    }

    next()
}

module.exports = checkEmail
