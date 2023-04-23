const db = require("../../../models");

exports.getOrder = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      var response = new Array();

      let orderList;

      if (data.tab === null || data.tab === "Tất cả") {
        [orderList] = await db.sequelize.query(`
              select
                  order_details.id,
                  order_details.code,
                  order_details.total,
                  order_statuses.status,
                  order_details.createdAt
              from
                  order_details
                  left join order_statuses on order_statuses.id = order_details.status_id
                  left join order_items on order_items.order_detail_id = order_details.id
              where
                  order_details.user_id = ${data.user_id}
              group by
                  order_details.id 
              order by
                  order_details.createdAt asc;
        `);
      } else {
        [orderList] = await db.sequelize.query(`
                    select
                        order_details.id,
                        order_details.code,
                        order_details.total,
                        order_statuses.status,
                        order_details.createdAt
                    from
                        order_details
                        left join order_statuses on order_statuses.id = order_details.status_id
                        left join order_items on order_items.order_detail_id = order_details.id
                    where
                        order_details.user_id = ${data.user_id}
                        and order_statuses.status = "${data.tab}"
                    group by
                        order_details.id 
                    order by
                        order_details.createdAt asc;
        `);
      }

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

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });
