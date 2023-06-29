const jwt = require("jsonwebtoken")
const mailer = require("../../utils/mailer")
const MailVerifyRegister = require("./mail")

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
            "Kích hoạt tài khoản!",
            MailVerifyRegister({ client_host: process.env.CLIENT_URL, token: newToken })
        )
    }

    next()
}

module.exports = verifyEmailRegister
