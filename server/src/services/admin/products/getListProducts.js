const db = require("../../../models");

exports.getListProducts = (offset) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("offset", offset);

      const [amount] = await db.sequelize.query(
        `select count(*) as 'count' from products`
      );

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
        all: amount ? amount[0].count : null,
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
