const db = require("../../../models");

exports.homeService = (offset, limit) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("offset", offset);

      console.log("limit", limit);

      // get latest product
      const query = `select
                        products.id,
                        products.name,
                        products.image,
                        products.price,
                        products.rating,
                        products.stock,
                        products.discount,
                        products.isActive,
                        categories.name as "category",
                        categories.link as "linkCategory"
                    from
                        products
                        left join categories on categories.categoryId = products.categoryId
                    order by
                        products.createdAt desc
                    limit
                        ${offset, limit};`;

      const [response] = await db.sequelize.query(query);

      //   get count all products
      const [count] = await db.sequelize.query(
        "select count(*) as 'count' from products"
      );

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response ? response : null,
        count: count ? count[0].count : null,
      });
    } catch (error) {
      reject(error);
    }
  });
