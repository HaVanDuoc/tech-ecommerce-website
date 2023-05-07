const db = require("../../../models");

exports.handleDelete = (order_detail_id, order_items_id, product_id) =>
  new Promise(async (resolve, reject) => {
    try {
      // *
      // Subtract the money of product from the total payment (total in table order_details)
      // *
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
      const priceOfProduct = price - price * ((discount ? discount : 0) / 100);

      // find quantity ordered
      const quantity = await db.Order_Item.findOne({
        where: { id: order_items_id },
        attributes: ["quantity"],
        raw: true,
      });

      // new total order
      const newTotalOrder =
        Number(total.total) -
        Number(priceOfProduct) * Number(quantity.quantity);

      // update
      const update = await db.Order_Detail.update(
        {
          total: newTotalOrder,
        },
        {
          where: { id: order_detail_id },
        }
      );

      // Finally, delete product in table order_items
      const deleteItem = await db.Order_Item.destroy({
        where: {
          id: order_items_id,
        },
      });

      resolve({
        err: deleteItem ? 0 : 1,
        msg: deleteItem ? "Đã xóa sản phẩm ra khỏi hóa đơn!" : "Đã xảy ra lỗi!",
      });
    } catch (error) {
      reject(error);
    }
  });
