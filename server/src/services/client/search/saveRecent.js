const db = require("../../../models");

exports.saveRecent = (product_id, user_id) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("product_id", product_id);
      console.log("user_id", user_id);

      // Trường hợp đã tìm trước đó có trong database
      // Tìm và xóa cái cũ đi
      // sau đó thêm cái mới vào

      

      // Giới hạn mỗi user chỉ lưu 20 sản phẩm gần nhất
      // Đầu tiên kiểm tra đủ 20 lượt tìm kiếm chưa
      // nếu đủ thì xóa cái cuối đi
      // Sau đó lưu cái mới vào

      const [countRecent] = await db.sequelize.query(
        `select count(*) as 'count' from searches where user_id = "${user_id}"`
      );

      if (countRecent[0].count === 20) {
        // find id last item in search recent
        var [lastSearch] = await db.sequelize.query(
          `select id from searches order by createdAt limit 1`
        );

        // delete
        await db.Search.destroy({ where: { id: lastSearch[0].id } });

        // update
        var updateRecent = await db.Search.create({ user_id, product_id });
      } else {
        var updateRecent = await db.Search.create({ user_id, product_id });
      }

      resolve({
        err: updateRecent ? 0 : 1,
        msg: updateRecent ? "Update successfully" : "Update failure",
      });
    } catch (error) {
      reject(error);
    }
  });
