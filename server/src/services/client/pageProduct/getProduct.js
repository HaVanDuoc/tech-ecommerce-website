const db = require("../../../models");

exports.getProduct = (nameProduct, user_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `select
                            products.id,
                            products.name,
                            products.image,
                            products.price,
                            products.rating,
                            products.stock,
                            products.discount,
                            products.isActive,
                            categories.name as "category"
                        from
                            products
                            left join categories on categories.categoryId = products.categoryId
                        where
                            products.name = '${nameProduct}'
                        limit
                            1`;

      const [response] = await db.sequelize.query(query);

      // // check add cart
      const checkAddCart = async () => {
        const cart_session_id = await db.Cart_Session.findOne({
          where: { user_id },
          attributes: ["id"],
          raw: true,
        });

        const find = await db.Cart_Item.findOne({
          where: {
            cart_session_id: cart_session_id?.id,
            product_id: response[0].id,
          },
        });

        find ? (isAddCart = true) : (isAddCart = false);
      };

      if (user_id) {
        // Nếu user_id === null thì ko cần check
        checkAddCart();
      }

      resolve({
        isAddCart: isAddCart ? true : false,
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response ? response[0] : null,
      });
    } catch (error) {
      reject(error);
    }
  });
