const db = require("../../../models");

exports.getCart = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const cart_session_id = await db.Cart_Session.findOne({
        where: { user_id: data.user_id },
        attributes: ["id"],
        raw: true,
      });

      const query = `select
                        products.id,
                        products.name,
                        products.image,
                        products.price,
                        products.discount,
                        cart_items.quantity,
                        cart_items.cart_session_id
                    from
                        cart_items
                        left join products on products.id = cart_items.product_id
                    where
                        cart_items.cart_session_id = '${cart_session_id.id}';`;

      const [response] = await db.sequelize.query(query);

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Update data successfully" : "Update data failed",
        data: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });
