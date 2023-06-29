const nodemailer = require("nodemailer")
const mailConfig = require("../config/mail.config")

exports.sendMail = (to, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD,
        },
    })

    const mailOptions = {
        from: {
            name: "Tech",
            address: mailConfig.USERNAME,
        },
        to: to,
        subject: subject,
        html: htmlContent,
    }

    return transporter.sendMail(mailOptions)
}
