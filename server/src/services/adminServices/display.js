const { padCategoryId } = require("../../helper/padLeft");
const db = require("../../models");

// Get list categories
exports.listCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
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

exports.createNewCategory = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, image, link } = data;

      // Create Category Id
      const query = `select categoryId from categories order by id desc limit 1;`;
      const [idCategoryFinal] = await db.sequelize.query(query);
      const sliceId = idCategoryFinal[0].categoryId.slice(-3);
      const categoryId = padCategoryId(parseInt(sliceId) + 1);

      const response = await db.Category.findOrCreate({
        where: { name },
        defaults: {
          categoryId,
          name,
          illustration: image,
          link,
        },
        raw: true,
      });

      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1]
          ? "Đã thêm danh mục mới!"
          : `Danh mục ${name} đã tồn tại!`,
        data: response[1] ? response[0] : null,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.getCategory = (categoryId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          categoryId,
        },
      });

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
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.updateCategory = (categoryId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      // Check name is exists
      if (data.name) {
        const { count } = await db.Category.findAndCountAll({
          where: { name: data.name },
          attributes: ["id", "name"],
          raw: true,
        });

        // Count > 0 tìm thấy
        if (count !== 0)
          resolve({
            err: 1,
            msg: "Danh mục này đã tồn tại",
            data: null,
          });
      }

      response = await db.Category.update(data, {
        where: { categoryId },
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
