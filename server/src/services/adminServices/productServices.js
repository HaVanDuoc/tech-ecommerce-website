// productServices.js

const {
  padProductId,
  padRoleId,
  padCategoryId,
  padStatusId,
} = require("../../helper/padLeft");
const { sequelize } = require("../../models");

// Create new product
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

// Get list products
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

// Get product
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

      // check object is exists
      if (Array.isArray(response) && !response.length)
        return resolve({
          err: 1,
          msg: "Not find object",
          data: response[0],
        });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response[0],
      });
    } catch (error) {
      reject(error);
    }
  });

// Delete product
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

// Create new role
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

// Create new category
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

// Get list categories
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

// Create new status
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

// Get list brand
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
