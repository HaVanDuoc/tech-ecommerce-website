// authService.js

const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const register = ({ username, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      // kết quả trả về một array [data: object, created: boolean]
      const response = await db.User.findOrCreate({
        where: { username }, // tìm thấy username created=false -> Tài khoản đã tồn tại
        defaults: {
          // Ko tìm thấy dữ liệu -> created=true -> tạo dữ liệu mới theo defaults -> Đăng ký thành công
          username,
          password: hashPassword(password),
        },
      });

      // jwt.sign(payload, secretOrPrivateKey, [options, callback])
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              username: response[0].username,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '7d' // phiên đăng nhập
            }
          )
        : null;

      resolve({
        err: response[1] ? 0 : 1,
        mess: response[1] ? "Đăng ký thành công" : "Tài khoản đã tồn tại",
        token,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { register };
