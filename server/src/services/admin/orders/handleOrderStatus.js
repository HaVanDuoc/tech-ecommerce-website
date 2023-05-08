const db = require("../../../models");

exports.handleOrderStatus = (actionConfirm, actionConfirmed, codeOrder) =>
  new Promise(async (resolve, reject) => {
    try {
      let status_id;

      // order_statuses
      switch (actionConfirmed) {
        case actionConfirm.XAC_NHAN_DON_HANG:
          status_id = 2; // Chờ xác nhận
          break;

        case actionConfirm.DA_LAY_HANG:
          status_id = 3; // Đang giao
          break;

        case actionConfirm.DA_GIAO:
          status_id = 4; // Đã giao
          break;

        case actionConfirm.TRA_HANG:
          status_id = 6; // Trả hàng
          break;

        case actionConfirm.MUA_LAI: // Trường hợp đã trả hàng sau khi "xác nhận mua lại" chuyển sang "chờ lấy hàng" ko cần "chờ xác nhận" nữa
          status_id = 2; // Chờ xác nhận
          break;

        default:
          return;
      }

      // Change new status for order
      const updateStatus = await db.Order_Detail.update(
        { status_id },
        { where: { code: codeOrder } }
      );

      const order_details_info = await db.Order_Detail.findOne({
        where: { code: codeOrder },
        attributes: ["user_id", "total"],
        raw: true,
      });

      const user_id = order_details_info.user_id;
      const order_totalPayment = order_details_info.total;

      // Nếu giao hàng thành công (Đã giao) thì cập nhật Tổng thanh toán cho user
      if (actionConfirmed === actionConfirm.DA_GIAO) {
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
        err: updateStatus ? 0 : 1,
        msg: updateStatus
          ? `${actionConfirmed}`
          : "Update Order Status Failure",
      });
    } catch (error) {
      reject(error);
    }
  });
