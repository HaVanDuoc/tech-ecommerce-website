const jwt = require("jsonwebtoken");
const { badRequest, unauthorized } = require("./handleError");

const verifyToken = (req, res, next) => {
  const auth = req.header("Authorization");

  console.log('auth', auth)

  if (!auth) return badRequest("Yêu cầu đăng nhập", res);

  // split: tách chuỗi thành mảng
  // access_token = Bearer token -> split access_token = ["Bearer", "token"]
  const accessToken = token.split(" ")[1];

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return unauthorized("Phiên đăng nhập hết hạn. Yêu cầu đăng nhập lại", res);

    req.user = user;
  });

  next();
};

module.exports = verifyToken
