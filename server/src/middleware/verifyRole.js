const { unauthorized } = require("../middleware/handleError")

const isAdmin = (req, res, next) => {
    const roleCode = req.user.roleId
    if (roleCode === "R001") return unauthorized("Bạn không được phép thực hiện chức năng này!", res)
    next()
}

module.exports = isAdmin
