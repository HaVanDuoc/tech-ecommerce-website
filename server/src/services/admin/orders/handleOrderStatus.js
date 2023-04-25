const db = require("../../../models");

exports.handleOrderStatus = (order_id, order_totalPayment, confirm, user_id) =>
  new Promise(async (resolve, reject) => {
    try {
      let status_id;

      // order_statuses
      // Chờ xác nhận - 1
      // Chờ lấy hàng - 2
      // Đang giao - 3
      // Đã giao - 4
      // Đã hủy - 5
      // Trả hàng - 6

      switch (confirm) {
        case "Xác nhận đơn hàng":
          status_id = 2;
          break;

        case "Đã lấy hàng":
          status_id = 3;
          break;

        case "Đã giao":
          status_id = 4;
          break;

        case "Trả hàng":
          status_id = 6;
          break;

        case "Mua lại": // Trường hợp đã trả hàng sau khi "xác nhận mua lại" chuyển sang "chờ lấy hàng" ko cần "chờ xác nhận" nữa
          status_id = 2;
          break;

        default:
          break;
      }

      const response = await db.Order_Detail.update(
        { status_id },
        { where: { id: order_id } }
      );

      // Nếu là đã giao thì cập nhật Tổng thanh toán cho user
      if (confirm === "Đã giao") {
        const [transactionVolume] = await db.sequelize.query(
          `select transactionVolume from users where id = ${user_id}`
        );

        const newTransactionVolume =
          Number(transactionVolume[0].transactionVolume) +
          Number(order_totalPayment);

        await db.sequelize.query(
          `update users set transactionVolume = ${newTransactionVolume} where id = ${user_id}`
        );
      }

      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Update Order Status Successfully"
          : "Update Order Status Failure",
      });
    } catch (error) {
      reject(error);
    }
  });
