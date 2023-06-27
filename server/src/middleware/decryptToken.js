const jwt = require("jsonwebtoken")

const decryptToken = (req, res, next) => {
    const token = req.header("Authorization")

    if (token) {
        const accessToken = token.split(" ")[1]

        jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
            req.user = user
        })
    }
    next()
}

module.exports = decryptToken
