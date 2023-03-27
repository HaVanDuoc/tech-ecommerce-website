// productServices.js

const {
  padProductId,
  padRoleId,
  padCategoryId,
  padStatusId,
} = require("../../helper/padLeft");
const db = require("../../models");
const { sequelize } = require("../../models");

// Create new product
exports.createNewProduct = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, image, price, stock, category, brand } = data;

      // Create Product Id
      const query = `select productId from products order by id desc limit 1;`;
      const [lastId] = await sequelize.query(query, { raw: true }); // Get uid of user final e.g 'U00000006'
      const sliceId = lastId[0].productId.slice(-8); // get 8 char final to result e.g '00000006'
      const productId = padProductId(parseInt(sliceId) + 1); // parseInt is convert 00000006 to 6

      const response = await db.Product.findOrCreate({
        where: { name },
        defaults: {
          productId,
          name,
          image: JSON.stringify(image), // Dữ liệu hiện tại là array phải chuyển sang string trước khi lưu vào database
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
                          convert(products.images using utf8) as 'images',
                          products.price,
                          products.discount,
                          products.view,
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
                          products.productId = '${productId}'
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

// Update product
exports.updateProduct = (productId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      // Check name Exists
      if (data.name) {
        const { count } = await db.Product.findAndCountAll({
          where: { productId },
          attributes: ["id", "name"],
          raw: true,
        });

        if (count > 0)
          resolve({
            err: 1,
            msg: "Tên này đã được sử dụng!",
            data: null,
          });
      }

      // Chia làm 2 lần update
      // nếu có hình ảnh được gán trong `images` và update bằng query

      const { images, ...other } = data;

      if (images) {
        let query = `update
                        products
                    set
                        images = '${images}'
                    where
                        productId = '${productId}'`;

        await db.sequelize.query(query);
        console.log("up duoc hinh anh");
      }

      // các thuộc tính còn lại sẽ được update dưới đây và update bằng sequelize
      let response = await db.Product.update(other, {
        where: { productId },
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
exports.getListCategory = () =>
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
      const { categoryId } = data;

      let query = `select
                      brands.id,
                      brands.brandId,
                      brands.name
                  from
                      categorybrands
                      left join categories on categorybrands.categoryId = categories.id
                      left join brands on categorybrands.brandId = brands.id
                  where
                      categories.categoryId = "${categoryId}";`;

      const [response] = await db.sequelize.query(query);

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failed",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

// Get list brand
// exports.getImageList = (productId) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const query = `SELECT
//                           convert(products.images using utf8) as 'images'
//                       FROM
//                           products
//                           LEFT JOIN categories on products.categoryId = categories.categoryId
//                           LEFT JOIN brands on products.brandId = brands.brandId
//                       Where
//                           products.productId = '${productId}'
//                       LIMIT
//                           1;`;

//       const [response] = await sequelize.query(query, { raw: true });

//       // check object is exists
//       if (Array.isArray(response) && !response.length)
//         return resolve({
//           err: 1,
//           msg: "Not find object",
//           data: response[0],
//         });

//       resolve({
//         err: response ? 0 : 1,
//         msg: response ? "Get data successfully" : "Get data failure",
//         data: response[0],
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });

// Get list brand
exports.getImageList = (productId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.findOne({
        where: { productId },
        attributes: ["image"],
      });

      // check object is exists
      if (Array.isArray(response) && !response.length)
        return resolve({
          err: 1,
          msg: "Not find object",
          data: response,
        });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

//
exports.updateImageList = (data, productId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = db.Product.update(
        { image: data.image },
        { where: { productId } }
      );

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response[0],
      });
    } catch (error) {
      reject(error);
    }
  });
