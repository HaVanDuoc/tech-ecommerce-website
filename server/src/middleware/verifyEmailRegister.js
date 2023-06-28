const jwt = require("jsonwebtoken")
const mailer = require("../utils/mailer")

const verifyEmailRegister = (req, res, next) => {
    const firstName = req.body.firstName
    const middleName = req.body.middleName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const isVerify = req.body.isVerify

    if (!isVerify) {
        const newToken = jwt.sign(
            {
                firstName,
                middleName,
                lastName,
                email,
                password: jwt.sign({ password }, process.env.JWT_SECRET, { expiresIn: "10m" }),
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "10m",
            }
        )

        // Send mail verify to email is registered
        return mailer.sendMail(
            email,
            "Xác thực Email",
            `<a href="${process.env.CLIENT_URL}/verifyEmail?token=${newToken}"><b>BẤM VÀO ĐÂY ĐỂ XÁC NHẬN!!!</b></a>`
        )
    }

    next()
}

module.exports = verifyEmailRegister
