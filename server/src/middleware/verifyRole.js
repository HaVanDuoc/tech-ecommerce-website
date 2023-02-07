const { unauthorized } = require("../middleware/handleError");

exports.isAdmin = (req, res, next) => {
  const roleCode = req.user.role_code; // req.user get from verifyToken.js
  if (roleCode === "r1")
    return unauthorized("Tài khoản không đủ thẩm quyền để truy cập", res);

  next();
};
