//
// Create new product service
//
const db = require("../../../models");

exports.updateDetails = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, stock, price, discount, productId } = data;

      let newData = {
        name,
        stock,
        price,
        discount,
      };

      // Kiểm tra tên đã sủ dụng hay chưa
      if (name) {
        const [response] = await db.sequelize.query(
          `select * from products where name = '${name}' limit 1`
        );

        if (response.length > 0)
          resolve({
            err: 1,
            msg: "Tên sản phẩm này đã được sử dụng!",
            data: null,
          });

        return;
      }

      // Lấy cái stock cũ cộng với stock được thêm vào
      if (stock) {
        const [response] = await db.sequelize.query(
          `select stock from products where productId = '${productId}' limit 1`
        );

        newData.stock = Number(response[0]?.stock) + Number(stock);
      }

      const response = await db.Product.update(newData, {
        where: { productId },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Cập nhật thành công!" : "Cập nhật thất bại!",
        data: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });
