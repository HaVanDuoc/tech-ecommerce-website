const { unauthorized } = require("../middleware/handleError");

exports.isAdmin = (req, res, next) => {
  const roleCode = req.user.roleCode; // req.user get from verifyToken.js
  if (roleCode === "R001")
    return unauthorized("Tài khoản không đủ thẩm quyền để truy cập", res);

  next();
};
