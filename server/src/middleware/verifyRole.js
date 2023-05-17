const { unauthorized } = require("../middleware/handleError");

const isAdmin = (req, res, next) => {
  const roleCode = req.user.roleId; // req.user get from verifyToken.js
  if (roleCode === "R001")
    return unauthorized("Tài khoản không đủ thẩm quyền để thực hiện!", res);

  next();
};

module.exports = isAdmin;
