const db = require("../../../models");

exports.search = (user_id) =>
  new Promise(async (resolve, reject) => {
    try {
      return;
      const response = await db.Search.findAll({
        where: { user_id },
        limit: 5,
        raw: true,
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get successfully" : "Get failure",
        data: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });
