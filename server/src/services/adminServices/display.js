const { padCategoryId, padBrandId } = require("../../helper/padLeft");
const { sequelize } = require("../../models");
const db = require("../../models");

// Get list categories
// exports.listCategories = () =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await db.categories.findAll({
//         attributes: {
//           exclude: ["createdAt", "updatedAt"],
//         },
//         raw: true,
//       });

//       resolve({
//         err: response ? 0 : 1,
//         msg: response ? "Get data successfully" : "Get data failed",
//         data: response,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });

exports.createNewCategory = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, image, link } = data;

      // Create Category Id
      const query = `select categoryId from categories order by id desc limit 1;`;
      const [idCategoryFinal] = await db.sequelize.query(query);
      const sliceId = idCategoryFinal[0].categoryId.slice(-3);
      const categoryId = padCategoryId(parseInt(sliceId) + 1);

      const response = await db.categories.findOrCreate({
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
      const response = await db.categories.findOne({
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
      const { brands, name } = data;

      // return console.log("data", data.brands);

      // Update brands
      if (Array.isArray(brands) && brands.length > 0) {
        // get id to categoryId
        const [responseIdCategory] = await sequelize.query(
          `select id from categories where categoryId = "${categoryId}"`
        );
        const idCategory = responseIdCategory[0].id;

        // Remove all brands
        const remove = async () => {
          await db.categorybrands.destroy({
            where: {
              categoryId: idCategory,
            },
          });
        };

        remove();

        // Update new brands
        brands.map(async (name) => {
          const [responseIdBrand] = await sequelize.query(
            `select id from brands where name = "${name}"`
          );
          const idBrand = responseIdBrand[0].id;

          await db.categorybrands.findOrCreate({
            where: { categoryId: idCategory, brandId: idBrand },
            defaults: {
              categoryId: idCategory,
              brandId: idBrand,
            },
          });
        });
      }

      if (name) {
        // Check name is exists
        const { count } = await db.categories.findAndCountAll({
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

      response = await db.categories.update(data, {
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

exports.createNewBrand = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, logo, link } = data;

      // Create Category Id
      const query = `select brandId from brands order by id desc limit 1;`;
      const [idFinal] = await db.sequelize.query(query);
      if (idFinal.length === 0) {
        var sliceId = 0;
      } else {
        sliceId = idFinal[0].brandId.slice(-3);
      }

      const brandId = padBrandId(parseInt(sliceId) + 1);

      const response = await db.brands.findOrCreate({
        where: { name },
        defaults: {
          brandId,
          name,
          logo,
          link,
        },
        raw: true,
      });

      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1]
          ? "Đã thêm thương hiệu mới!"
          : `Thương hiệu ${name} đã tồn tại!`,
        data: response[1] ? response[0] : null,
      });
    } catch (error) {
      reject(error);
    }
  });

// exports.listBrand = () =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await db.Brand.findAll({
//         attributes: {
//           exclude: ["createdAt", "updatedAt"],
//         },
//         raw: true,
//       });

//       resolve({
//         err: response ? 0 : 1,
//         msg: response ? "Get data successfully" : "Get data failed",
//         data: response,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });

exports.setBrandForCategories = (categoryId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const [responseIdCategory] = await sequelize.query(
        `select id from categories where categoryId = "${categoryId}"`
      );
      const idCategory = responseIdCategory[0].id; //

      const [responseIdBrand] = await sequelize.query(
        `select id from brands where name = "${data.name}"`
      );
      const idBrand = responseIdBrand[0].id; //

      const response = await db.categorybrands.findOrCreate({
        where: {
          categoryId: idCategory,
          brandId: idBrand,
        },
        defaults: {
          categoryId: idCategory,
          brandId: idBrand,
        },
      });

      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1]
          ? "Thành công!"
          : "Thương hiệu này đã có trong danh mục!",
        data: response[1] ? response[0] : null,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.selectedBrands = (categoryId) =>
  new Promise(async (resolve, reject) => {
    try {
      const [responseIdCategory] = await sequelize.query(
        `select id from categories where categoryId = "${categoryId}"`
      );
      const idCategory = responseIdCategory[0].id;

      const query = `select
                        brands.name as 'brands'
                      from
                          categorybrands
                          left join categories on categorybrands.categoryId = categories.id
                          left join brands on categorybrands.brandId = brands.id
                      where
                          categorybrands.categoryId = "${idCategory}";`;

      const [response] = await db.sequelize.query(query);

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

// exports.getBrand = (brandId) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await db.Brand.findOne({
//         where: { brandId },
//         attributes: {
//           exclude: ["createdAt", "updatedAt"],
//         },
//       });

//       resolve({
//         err: response ? 0 : 1,
//         msg: response ? "Get data successfully" : "Get data failure",
//         data: response,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });

// exports.updateBrand = (brandId, data) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       console.log("data", data);

//       const { name, link, logo } = data;

//       // Check name brand is exists?
//       if (name) {
//         let response = await db.Brand.findOne({ where: { name: data.name } });
//         if (response)
//           resolve({
//             err: 1,
//             msg: "Thương hiệu này đã tồn tại!",
//             data: null,
//           });
//       }

//       // update
//       let response = await db.Brand.update(
//         {
//           name,
//           link,
//           logo,
//         },
//         { where: { brandId } }
//       );

//       resolve({
//         err: response ? 0 : 1,
//         msg: response ? "Cập nhật thành công!" : "Cập nhật thất bại!",
//         data: response,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
