// authService.js

const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// SERVICE REGISTER
const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      // kết quả trả về một array [data: object, created: boolean]
      const response = await db.User.findOrCreate({
        where: { email }, // tìm thấy email created=false -> Tài khoản đã tồn tại
        defaults: {
          // Ko tìm thấy dữ liệu -> created=true -> tạo dữ liệu mới theo defaults -> Đăng ký thành công
          email,
          password: hashPassword(password),
        },
        raw: true, // chuyển instants thành object json
      });

      // jwt.sign(payload, secretOrPrivateKey, [options, callback])
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d", // phiên đăng nhập
            }
          )
        : null;

      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1] ? "Đăng ký thành công" : "Tài khoản đã tồn tại",
        access_token: token ? `Bearer ${token}` : token,
      });
    } catch (error) {
      reject(error);
    }
  });

// SERVICE LOGIN
const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true, // chuyển instants thành object json
      });

      // Check password
      const isCheckedPassword =
        response && bcrypt.compareSync(password, response.password);
      const token = isCheckedPassword
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d", // phiên đăng nhập
            }
          )
        : null;

      resolve({
        err: token ? 0 : 1,
        msg: token
          ? "Đăng nhập thành công"
          : response
          ? "Sai mật khẩu"
          : "Tài khoản chưa được đăng ký",
        access_token: token ? `Bearer ${token}` : token,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { register, login };
