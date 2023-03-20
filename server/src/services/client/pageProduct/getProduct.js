const db = require("../../../models");

exports.getProduct = (nameProduct) =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `select
                            products.id,
                            products.name,
                            products.image,
                            products.price,
                            products.rating,
                            products.stock,
                            products.discount,
                            products.isActive,
                            categories.name as "category"
                        from
                            products
                            left join categories on categories.categoryId = products.categoryId
                        where
                            products.name = '${nameProduct}'
                        limit
                            1`;

      const [response] = await db.sequelize.query(query);

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response ? response[0] : null,
      });
    } catch (error) {
      reject(error);
    }
  });
