const db = require("../../../models");

exports.updateView = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const getView = await db.Category.findOne({
        where: { id },
        attributes: ["accessTime"],
        raw: true,
      });

      const response = await db.Category.update(
        {
          accessTime:
            Number(getView?.accessTime ? getView?.accessTime : 0) + Number(1),
        },
        { where: { id } }
      );

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Update data successfully" : "Update data failed",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
