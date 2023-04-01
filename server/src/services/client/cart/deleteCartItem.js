const db = require("../../../models");

exports.deleteCartItem = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Cart_Item.destroy({
        where: {
          product_id: data.product_id,
          cart_session_id: data.cart_session_id,
        },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Delete data successfully" : "Delete data failed",
        data: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });
