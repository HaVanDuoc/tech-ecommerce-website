const db = require("../../../models");

exports.getListProducts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.findAll({
        attributes: [
          "id",
          "productId",
          "image",
          "name",
          "price",
          "stock",
          "isActive",
        ],
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
