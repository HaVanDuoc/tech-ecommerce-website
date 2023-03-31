const db = require("../../../models");

exports.handleAddCart = (user_id, product_id) =>
  new Promise(async (resolve, reject) => {
    try {
      // First, find `cart_session_id`
      const cart_session_id = await db.Cart_Session.findOne({
        where: { user_id },
        attributes: ["id"],
        raw: true,
      });

      // Second, check to see if the product is already in shopping cart
      // if yes, delete it otherwise, add it
      const checkAdd = await db.Cart_Item.findOrCreate({
        where: { cart_session_id: cart_session_id.id, product_id },
        defaults: {
          cart_session_id: cart_session_id.id,
          product_id,
          quantity: 1,
        },
      });

      if (!checkAdd[1]) {
        const destroy = await db.Cart_Item.destroy({
          where: { cart_session_id: cart_session_id.id, product_id },
        });

        resolve({
          isAddCart: false,
          err: destroy ? 0 : 1,
          msg: destroy && "Đã xóa sản phẩm khỏi giỏ hàng",
          data: destroy,
        });
      }

      resolve({
        isAddCart: true,
        err: checkAdd ? 0 : 1,
        msg: checkAdd && "Đã thêm sản phẩm vào giỏ hàng",
        data: checkAdd ? checkAdd[0] : null,
      });
    } catch (error) {
      reject(error);
    }
  });
