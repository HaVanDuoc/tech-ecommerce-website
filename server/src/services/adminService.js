const { padRoleId, padCategoryId, padStatusId } = require("../helper/padLeft");
const { badRequest } = require("../middleware/handleError");
const db = require("../models");

exports.getAllUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        attributes: [
          "userId",
          "firstName",
          "middleName",
          "lastName",
          "email",
          "status",
        ],
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failed",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.createNewRole = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      // ID
      const responseId = await db.Role.count({ distinct: true, col: "id" });
      const roleId = padRoleId(responseId + 1);

      const response = await db.Role.findOrCreate({
        where: { name: data.name }, // tìm thấy name created=false -> Tài khoản đã tồn tại
        defaults: { roleId, name: data.name },
        raw: true, // chuyển instants thành object json
      });

      resolve({
        err: response ? 0 : 1,
        msg: response[1] ? "Create successfully" : "Already exist",
        data: response[0],
      });
    } catch (error) {
      reject(error);
    }
  });

exports.createNewCategory = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      // ID
      const responseId = await db.Category.count({ distinct: true, col: "id" });
      const categoryId = padCategoryId(responseId + 1);

      const response = await db.Category.findOrCreate({
        where: { name: data.name }, // tìm thấy name created=false -> Tài khoản đã tồn tại
        defaults: { categoryId, name: data.name },
        raw: true, // chuyển instants thành object json
      });

      resolve({
        err: response ? 0 : 1,
        msg: response[1] ? "Create successfully" : "Already exist",
        data: response[0],
      });
    } catch (error) {
      reject(error);
    }
  });

exports.createNewStatus = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      // ID
      const responseId = await db.Status.count({ distinct: true, col: "id" });
      const statusId = padStatusId(responseId + 1);

      const response = await db.Status.findOrCreate({
        where: { name: data.name }, // tìm thấy name created=false -> Tài khoản đã tồn tại
        defaults: { statusId, name: data.name },
        raw: true, // chuyển instants thành object json
      });

      resolve({
        err: response ? 0 : 1,
        msg: response[1] ? "Create successfully" : "Already exist",
        data: response[0],
      });
    } catch (error) {
      reject(error);
    }
  });
