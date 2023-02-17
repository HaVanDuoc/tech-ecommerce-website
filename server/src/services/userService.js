const db = require("../models");

// GET ONE USER
exports.getOneUser = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ["password"], // loại bỏ password trong data response
        },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Đã tìm thấy user" : "Không thấy",
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

// POST - CREATE NEW USER
exports.createNewUser = (user) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.create({
        firstName: "Hà",
        middleName: "Văn",
        lastName: "Được",
        email: "havanduoc@gmail.com",
        password: "123456",
        phoneNumber: "0123456789",
        address: "Việt nam",
        gender: "male",
      });

      console.log("response", response);

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Đã thêm người dùng mới" : "Tạo người dùng thất bại",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
