const db = require("../../../models");

exports.getOrders = (page) =>
  new Promise(async (resolve, reject) => {
    try {
      const limit = 8;
      const offset = (page - 1) * limit;
      var response = new Array();
      let orderList;

      [orderList] = await db.sequelize.query(`
              select
                  order_details.id,
                  order_details.code,
                  order_details.total,
                  order_statuses.status,
                  order_details.user_id,
                  order_details.createdAt
              from
                  order_details
                  left join order_statuses on order_statuses.id = order_details.status_id
                  left join order_items on order_items.order_detail_id = order_details.id
              group by
                  order_details.id 
              order by
                  order_details.createdAt desc 
              limit 
                    ${limit} 
              offset 
                    ${offset};
        `);

      await Promise.all(
        orderList.map(async (item) => {
          const [orderItem] = await db.sequelize.query(`
                      select
                          order_items.id,
                          order_items.quantity,
                          order_items.product_id,
                          products.productId,
                          products.name as 'name_product',
                          products.image,
                          products.price,
                          products.discount,
                          order_items.createdAt
                      from
                          order_items
                          left join products on products.id = order_items.product_id
                      where
                          order_items.order_detail_id = ${item.id};
                `);

          item.orderItem = orderItem;

          response.push(item);
        })
      );

      // count orders
      const [amount] = await db.sequelize.query(
        `select count(*) as 'count' from order_details`
      );

      resolve({
        limit: limit ? limit : null,
        all: amount ? amount[0].count : null,
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
