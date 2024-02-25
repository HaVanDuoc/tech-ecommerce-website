const jwt = require("jsonwebtoken")
const db = require("../models")
const mailer = require("../utils/mailer")
const MailVerifyRegister = require("./verifyEmailRegister/mail")

exports.checkCurrentUser = (req, res, next) => {
    const auth = req.header("Authorization")

    if (!auth) {
        req.user = null
        next()
    } else {
        const token = auth.replace("Bearer ", "")

        try {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

            req.user = { user_id: verifyToken.id }

            next()
        } catch (error) {
            req.user = null
            next()
        }
    }
}

exports.checkEmail = async (req, res, next) => {
    const email = req.body.email

    const requestCheck = async () => {
        return await db.users.findOne({
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

exports.verifyEmailRegister = (req, res, next) => {
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

exports.checkExistEmail = async (req, res, next) => {
    const email = req.body.email

    const requestCheck = async () => {
        return await db.users.findOne({
            where: { email },
            raw: true,
        })
    }

    if (email) {
        const response = await requestCheck()

        if (!response) {
            return res.status(200).json({
                err: 1,
                msg: "Email chưa được đăng ký!",
            })
        }
    }

    next()
}
