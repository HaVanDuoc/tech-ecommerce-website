const db = require("../../../models");

exports.decreaseQuantity = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const getCurrentQuantity = await db.Cart_Item.findOne({
        where: {
          product_id: data.product_id,
          cart_session_id: data.cart_session_id,
        },
        attributes: ["quantity"],
        raw: true,
      });

      const response = await db.Cart_Item.update(
        { quantity: Number(getCurrentQuantity.quantity) - 1 },
        {
          where: {
            product_id: data.product_id,
            cart_session_id: data.cart_session_id,
          },
        }
      );

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Update data successfully" : "Update data failed",
        data: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });
