const { QueryTypes } = require("sequelize");
const {
  padRoleId,
  padCategoryId,
  padStatusId,
  padUserId,
  padProductId,
} = require("../helper/padLeft");
const { hashPassword } = require("../helper/hashPassword");
const { badRequest } = require("../middleware/handleError");
const { sequelize } = require("../models");
const db = require("../models");

// ---------- Find ------------
//#region USER SERVICES
//#region PRODUCT SERVICES
//#region DATABASE SERVICES
// ----------------------------

//#region USER SERVICES

exports.getAllUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT
                        users.id,
                        userId,
                        firstName,
                        middleName,
                        lastName,
                        userName,
                        email,
                        avatar,
                        dateOfBirth,
                        transactionVolume,
                        statuses.name as 'status',
                        roles.name as "role"
                    FROM
                        users
                        left join statuses on users.statusId = statuses.statusId
                        left join roles on users.roleId = roles.roleId;`;

      const [response] = await sequelize.query(query, { raw: true });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failed",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.getUser = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT
                        users.id,
                        userId,
                        firstName,
                        middleName,
                        lastName,
                        userName,
                        email,
                        password,
                        avatar,
                        dateOfBirth,
                        phoneNumber,
                        address,
                        transactionVolume,
                        genders.name as 'gender',
                        statuses.name as 'status',
                        roles.name as "role"
                    FROM
                        users
                        left join statuses on users.statusId = statuses.statusId
                        left join roles on users.roleId = roles.roleId
                        left join genders on users.genderCode = genders.code
                    WhERE
                        userId = "${userId}"
                    LIMIT
                        1;`;

      const [response] = await sequelize.query(query, { raw: true });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failed",
        data: response[0],
      });
    } catch (error) {
      reject(error);
    }
  });

exports.createNewUser = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        firstName,
        middleName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        gender,
        role,
        birthday,
      } = data;

      // Create User Id
      const responseId = await db.User.count({ distinct: true, col: "id" });
      const userId = padUserId(responseId + 1);

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
          phoneNumber,
          address,
          dateOfBirth: birthday,
          genderCode: gender,
          roleId: role,
        },
        raw: true, // chuyển instants thành object json
      });

      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1] ? "Create successfully" : "Email đã được đăng ký",
        data: response[1] ? response[0] : null,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.updateUser = (userId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      response = await db.User.update(data, {
        where: { userId },
        raw: true,
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Cập nhật thành công" : "Cập nhật thất bại",
        data: response[0],
      });
    } catch (error) {
      reject(error);
    }
  });

exports.deleteUser = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.destroy({
        where: { userId },
        raw: true,
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Đã xóa" : "Xóa thất bại",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

//#region

//----------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------

//#region PRODUCT SERVICES

exports.getListProduct = () =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `select
                        products.id,
                        products.productId,
                        products.name,
                        products.image,
                        products.price,
                        products.stock,
                        products.rating,
                        products.isActive,
                        products.categoryId as 'category',
                        products.brandId as 'brand'
                    from
                        products
                        left join categories on products.categoryId = categories.categoryId
                        left join brands on products.brandId = brands.brandId`;

      const [response] = await sequelize.query(query, { raw: true });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failed",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.getProduct = (productId) =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT
                        products.id,
                        products.productId,
                        products.name,
                        products.image,
                        products.price,
                        products.rating,
                        products.stock,
                        products.isActive,
                        categories.name as 'category',
                        brands.name as 'brand'
                    FROM
                        products
                        LEFT JOIN categories on products.categoryId = categories.categoryId
                        LEFT JOIN brands on products.brandId = brands.brandId
                    Where
                        products.productId = "${productId}"
                    LIMIT
                        1;`;

      const [response] = await sequelize.query(query, { raw: true });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failed",
        data: response[0],
      });
    } catch (error) {
      reject(error);
    }
  });

exports.deleteProduct = (productId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.destroy({
        where: { productId },
        raw: true,
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Đã xóa sản phẩm!" : "Xóa thất bại",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.createNewProduct = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, image, price, stock, category, brand } = data;

      // Create Product Id
      const responseId = await db.Product.count({ distinct: true, col: "id" });
      const productId = padProductId(responseId + 1);

      const response = await db.Product.findOrCreate({
        where: { name },
        defaults: {
          productId,
          name,
          image,
          price,
          stock,
          categoryId: category,
          brandId: brand,
        },
        raw: true,
      });

      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1] ? "Create successfully" : `${name} đã tồn tại!`,
        data: response[1] ? response[0] : null,
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

exports.getListCategory = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        attributes: ["id", "categoryId", "name"],
        raw: true,
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

exports.getListSelectBrand = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Brand.findAll({
        where: { categoryId: data.categoryId },
        attributes: ["id", "brandId", "name"],
        raw: true,
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

//#endregion

//----------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------

exports.getListRole = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Role.findAll({
        attributes: ["id", "roleId", "name"],
        raw: true,
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
