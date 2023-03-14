const db = require("../../models");

exports.listBrand = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Brand.findAll();

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
