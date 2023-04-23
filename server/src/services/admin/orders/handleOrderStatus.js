const db = require("../../../models");

exports.handleOrderStatus = (order_id, order_status) =>
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

      switch (order_status) {
        case "Chờ xác nhận":
          status_id = 2;
          break;

        case "Chờ lấy hàng":
          status_id = 3;
          break;

        case "Đang giao":
          status_id = 4;
          break;

        case "Đã giao":
          status_id = 5;
          break;

        case "Đã hủy":
          status_id = 2; // Trường hợp đã hủy sẽ chuyển thành chờ xác nhận chính là mua lại
          break;

        case "Trả hàng": // Trường hợp đã trả hàng sau khi "xác nhận mua lại" chuyển sang "chờ lấy hàng" ko cần "chờ xác nhận" nữa
          status_id = 2;
          break;

        default:
          break;
      }

      const response = await db.Order_Detail.update(
        { status_id },
        { where: { id: order_id } }
      );

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
