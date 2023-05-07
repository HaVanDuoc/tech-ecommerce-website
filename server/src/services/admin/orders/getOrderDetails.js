const db = require("../../../models");

exports.getOrderDetails = (codeOrder) =>
  new Promise(async (resolve, reject) => {
    try {
      var response = [];

      const [detail] = await db.sequelize.query(`
          select
              table_orders.id as 'order_id',
              table_orders.code as 'order_code',
              table_orders.total,
              table_orders.order_status,
              table_orders.order_status_id,
              table_orders.user_id,
              table_users.userId,
              table_users.avatar,
              table_users.firstName,
              table_users.middleName,
              table_users.lastName,
              table_users.email,
              table_users.phoneNumber,
              table_users.address,
              table_users.dateOfBirth,
              table_users.gender,
              table_orders.createdAt
          from
              (
                  SELECT
                      order_details.id,
                      order_details.code,
                      order_details.user_id as 'user_id',
                      order_details.total,
                      order_details.status_id as 'order_status_id',
                      order_statuses.status as 'order_status',
                      order_details.createdAt
                  FROM
                      order_details
                      left join order_statuses on order_statuses.id = order_details.status_id
                  where
                      code = '${codeOrder}'
              ) as table_orders
              left join (
                  SELECT
                      users.id,
                      users.userId,
                      users.avatar,
                      users.firstName,
                      users.middleName,
                      users.lastName,
                      users.dateOfBirth,
                      genders.name as 'gender',
                      users.email,
                      users.phoneNumber,
                      users.address
                  FROM
                      users
                      left join genders on genders.code = users.genderCode
              ) as table_users on table_orders.user_id = table_users.id;
      `);

      response = { ...detail[0] };

      // Get list order in orders
      const [orderList] = await db.sequelize.query(`
          select
              order_items.id as 'order_items_id',
              order_items.order_detail_id,
              table_2.id as 'product_id',
              table_2.name as 'name_product',
              order_items.quantity,
              order_items.createdAt as 'createdAt_order',
              table_2.price,
              table_2.discount,
              table_2.category,
              table_2.image
          from
              order_items
              left join (
                  select
                      products.id,
                      products.name,
                      products.image,
                      products.price,
                      products.discount,
                      categories.name as 'category'
                  from
                      products
                      left join categories on categories.categoryId = products.categoryId
              ) table_2 on table_2.id = order_items.product_id
          where
              order_detail_id = ${detail[0].order_id};
      `);

      response["order_list"] = orderList;

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
