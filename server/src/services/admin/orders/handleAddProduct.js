const db = require("../../../models");

exports.handleAddProduct = (order_detail_id, product_id, quantity) =>
  new Promise(async (resolve, reject) => {
    try {
      // Add product to order
      const [add, created] = await db.Order_Item.findOrCreate({
        where: {
          order_detail_id,
          product_id,
        },
        defaults: {
          order_detail_id,
          product_id,
          quantity,
        },
      });

      if (created) {
        // current total in order_detail
        const total = await db.Order_Detail.findOne({
          where: { id: order_detail_id },
          attributes: ["total"],
          raw: true,
        });

        // find price and discount of new product
        const infoProduct = await db.Product.findOne({
          where: { id: product_id },
          attributes: ["price", "discount"],
          raw: true,
        });

        const price = infoProduct.price;
        const discount = infoProduct.discount;

        // calculator money of new product
        const priceOfProduct =
          price - price * ((discount ? discount : 0) / 100);

        // new total order
        const newTotalOrder =
          Number(total.total) + Number(priceOfProduct) * Number(quantity);

        // update
        const update = await db.Order_Detail.update(
          {
            total: newTotalOrder,
          },
          {
            where: { id: order_detail_id },
          }
        );
      }

      resolve({
        err: created ? 0 : 1,
        msg: created
          ? "Đã thêm sản phẩm mới!"
          : "Sản phẩm này đã có trong đơn hàng!",
      });
    } catch (error) {
      reject(error);
    }
  });
