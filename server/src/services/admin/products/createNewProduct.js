//
// Create new product service
//
const db = require("../../../models");
const { padProductId } = require("../../../helper/padLeft");

exports.createNewProduct = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, image, price, stock, category, brand, discount } = data;

      // Create Product Id
      const query = `select productId from products order by id desc limit 1;`;
      const [lastId] = await db.sequelize.query(query, { raw: true }); // Get uid of user final e.g 'U00000006'
      const sliceId = lastId[0].productId.slice(-8); // get 8 char final to result e.g '00000006'
      const productId = padProductId(parseInt(sliceId) + 1); // parseInt is convert 00000006 to 6

      const response = await db.Product.findOrCreate({
        where: { name },
        defaults: {
          productId,
          name,
          image,
          price,
          stock,
          discount,
          categoryId: category,
          brandId: brand,
        },
        raw: true,
      });

      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1] ? "Đã tạo sản phẩm!" : `${name} đã tồn tại!`,
        data: response[1] ? response[0] : null,
      });
    } catch (error) {
      reject(error);
    }
  });
