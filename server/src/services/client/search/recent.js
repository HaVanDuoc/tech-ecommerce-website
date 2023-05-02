const db = require("../../../models");

exports.recent = (user_id, limit) =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `
                      select
                      *
                      from
                          searches
                          left join (
                              select
                                  products.id,
                                  products.name,
                                  products.price,
                                  products.discount,
                                  products.image,
                                  categories.link as 'categoryLink'
                              from
                                  products
                                  left join categories on categories.categoryId = products.categoryId
                          ) as temp on temp.id = searches.product_id
                      order by
                          searches.createdAt desc
                      limit
                          6;
                  `;

      const [response] = await db.sequelize.query(query);

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get successfully" : "Get failure",
        data: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });
