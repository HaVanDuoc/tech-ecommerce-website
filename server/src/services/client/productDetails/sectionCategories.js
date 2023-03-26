const db = require("../../../models");

exports.sectionCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        attributes: ["name", "link"],
        raw: true,
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });
