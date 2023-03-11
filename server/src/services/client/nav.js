const db = require("../../models");

exports.getNav = () =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `select
                        id,
                        categoryId,
                        name,
                        illustration,
                        link,
                        accessTime
                    from
                        categories
                    order by
                        accessTime;`;

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
