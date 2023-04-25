const db = require("../../../models");

exports.checkNameProduct = (key) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.findOne({ where: { name: key } });

      resolve({
        err: response ? 1 : 0,
        msg: response ? "Đã có sản phẩm này!" : "Có thế sử dụng tên này!",
      });
    } catch (error) {
      reject(error);
    }
  });
