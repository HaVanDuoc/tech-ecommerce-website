const db = require("../../../models");

exports.suggest = (key, limit) =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT
                          products.id,
                          products.name,
                          products.price,
                          products.discount,
                          products.image,
                          categories.name as 'category',
                          categories.link as 'categoryLink'
                      FROM
                          products
                      LEFT JOIN
                          categories on categories.categoryId = products.categoryId
                      Where
                          products.name LIKE "%${key}%"
                      LIMIT
                          ${limit};`;

      const [result] = await db.sequelize.query(query);

      resolve({
        err: result ? 0 : 1,
        msg: result ? "Get successfully" : "Get failure",
        data: result ? result : null,
      });
    } catch (error) {
      reject(error);
    }
  });
