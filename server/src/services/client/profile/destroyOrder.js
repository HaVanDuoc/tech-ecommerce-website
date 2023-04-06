const db = require("../../../models");

exports.destroyOrder = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      // check current status
      const [response] = await db.sequelize.query(`select
                                                        order_statuses.status
                                                    from
                                                        order_details
                                                        left join order_statuses on order_statuses.id = order_details.status_id
                                                    where
                                                        order_details.id = "${data.order_details_id}"`);

      // Chỉ có `Chờ xác nhận mới được phép hủy

      // Nếu response đang là hủy thì chuyển thành Chờ xác nhận
      if (response[0].status === "Đã hủy") {
        await db.Order_Detail.update(
          { status_id: 1 },
          { where: { id: data.order_details_id } }
        );
      }

      // Ngược lại Chờ xác nhận thì chuyển thành Hủy
      if (response[0].status === "Chờ xác nhận") {
        await db.Order_Detail.update(
          { status_id: 5 },
          { where: { id: data.order_details_id } }
        );
      }

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Update successfully" : "Update failure",
        data: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });
