// authService.js

const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { padUserId } = require("../helper/padLeft");
const { hashPassword } = require("../helper/hashPassword");

// SERVICE REGISTER
const register = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { firstName, middleName, lastName, email, password } = data;

      // Create User Id
      const responseId = await db.User.count({ distinct: true, col: "id" });
      const userId = padUserId(responseId + 1);

      const roleId = "R001"; // Role default is "R001" - "khách hàng"

      // kết quả trả về một array [data: object, created: boolean]
      const response = await db.User.findOrCreate({
        where: { email }, // tìm thấy email created=false -> Tài khoản đã tồn tại
        // Ko tìm thấy dữ liệu -> created=true -> tạo dữ liệu mới theo defaults -> Đăng ký thành công
        defaults: {
          userId,
          firstName,
          middleName,
          lastName,
          email,
          password: hashPassword(password),
          roleId,
        },
        raw: true, // chuyển instants thành object json
      });

      // Nếu đăng ký thành công xem như đã đăng nhập nên tạo token luôn
      // jwt.sign(payload, secretOrPrivateKey, [options, callback])
      const token = response[1]
        ? jwt.sign(
            {
              userId: response[0].userId,
              email: response[0].email,
              firstName: response[0].firstName,
              middleName: response[0].middleName,
              lastName: response[0].lastName,
              roleId: response[0].roleId,
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
const login = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { email, password } = data;

      const response = await db.User.findOne({
        where: { email },
        raw: true, // chuyển instants thành object json
      });

      console.log(response)

      // Check password
      const isCheckedPassword =
        response && bcrypt.compareSync(password, response.password);

      const token = isCheckedPassword
        ? jwt.sign(
            {
              userId: response.userId,
              email: response.email,
              firstName: response.firstName,
              middleName: response.middleName,
              lastName: response.lastName,
              roleId: response.roleId,
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
