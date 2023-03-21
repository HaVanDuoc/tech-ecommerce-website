const db = require("../../../models");

exports.listNav = () =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `select
                        name,
                        link
                    from
                        categories
                    order by
                        accessTime desc;`;

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
