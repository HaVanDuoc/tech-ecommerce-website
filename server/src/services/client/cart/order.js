const db = require("../../../models");
const { v4: uuidv4 } = require("uuid");

exports.order = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const uuid = uuidv4(); // code for order details

      const [createOrder, created] = await db.Order_Detail.findOrCreate({
        where: { code: uuid },
        defaults: {
          user_id: data[0].user_id,
          status_id: 1, // default 1 - Chờ xác nhận
          total: 0,
          code: uuid,
        },
        raw: true,
      });

      if (!created) {
        resolve({
          err: 1,
          msg: "Không khởi tạo được đơn hàng. Vui lòng thử lại!",
        });

        return;
      }

      // Tạo order_item vào đơn hàng trên
      data.map(async (item) => {
        await db.Order_Item.create({
          order_detail_id: createOrder.dataValues.id,
          product_id: item.product_id,
          quantity: item.quantity,
        });

        // update total payment in order_details
        await db.Order_Detail.update(
          {
            total: item.totalPayment,
          },
          {
            where: {
              id: createOrder.dataValues.id,
            },
          }
        );

        // Đặt hàng rồi thì vô giỏ hàng xóa nó đi
        await db.Cart_Item.destroy({
          where: {
            cart_session_id: item.cart_sessions_id,
            product_id: item.product_id,
          },
        });
      });

      resolve({
        err: createOrder ? 0 : 1,
        msg: createOrder
          ? "Cảm ơn quý khách (づ￣ 3￣)づ"
          : "Đặt hàng thất bại!",
        data: createOrder ? createOrder : null,
      });
    } catch (error) {
      reject(error);
    }
  });
