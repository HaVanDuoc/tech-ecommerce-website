const db = require("../../../models");

exports.handleDecrease = (order_items_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const getCurrentQuantity = await db.Order_Item.findOne({
        where: {
          id: order_items_id,
        },
        attributes: ["quantity"],
        raw: true,
      });

      const response = await db.Order_Item.update(
        { quantity: Number(getCurrentQuantity.quantity) - 1 },
        {
          where: {
            id: order_items_id,
          },
        }
      );

      // Giảm tổng tiền
      const [decrease_money] = await db.sequelize.query(`
          select
              order_items.id as 'order_items_id',
              order_details.id as 'order_details_id',
              order_details.total as 'total_money',
              products.price as 'price_product',
              products.discount as 'discount_product'
          from
              order_items
              left join products on products.id = order_items.product_id
              left join order_details on order_details.id = order_items.order_detail_id
          where
              order_items.id = ${order_items_id};
      `);

      const order_details_id = decrease_money[0].order_details_id;
      const total = decrease_money[0].total_money;
      const price = decrease_money[0].price_product;
      const discount = decrease_money[0].discount_product;

      const newTotalMoney =
        total - (price - price * ((discount ? discount : 0) / 100));

      console.log("newTotalMoney", newTotalMoney);

      const updateTotal = await db.Order_Detail.update(
        { total: newTotalMoney },
        {
          where: { id: order_details_id },
        }
      );

      resolve({
        err: updateTotal ? 0 : 1,
        msg: updateTotal ? "Update data successfully" : "Update data failed",
      });
    } catch (error) {
      reject(error);
    }
  });
