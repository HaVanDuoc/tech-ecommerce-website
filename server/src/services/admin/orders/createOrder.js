const db = require("../../../models");
const { v4: uuidv4 } = require("uuid");

exports.createOrder = (orders, user_id, payment) =>
  new Promise(async (resolve, reject) => {
    try {
      const uuid = uuidv4(); // code for order details

      // First, create order - order_details
      const create = await db.Order_Detail.create({
        user_id,
        total: payment,
        code: uuid,
        status_id: 4, // Đã giao
      });

      // Add order_items
      const order_detail_id = create.id;

      orders.map((item) => {
        const createOrderItem = async () => {
          await db.Order_Item.create({
            order_detail_id,
            product_id: item.id,
            quantity: item.quantity,
          });
        };

        createOrderItem();
      });

      // update payment in users
      const [transactionVolume] = await db.sequelize.query(
        `select transactionVolume from users where id = ${user_id}`
      );

      const newTransactionVolume =
        Number(transactionVolume[0].transactionVolume) + Number(payment);

      const updateTransactionVolume = await db.sequelize.query(
        `update users set transactionVolume = ${newTransactionVolume} where id = ${user_id}`
      );

      resolve({
        err: updateTransactionVolume ? 0 : 1,
        msg: updateTransactionVolume ? "Hoàn tất giao dịch" : "Thất bại!",
      });
    } catch (error) {
      reject(error);
    }
  });
