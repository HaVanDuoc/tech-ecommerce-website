const db = require("../../models");

exports.showBrand = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("data", data);

      const query = `select
                            brands.name,
                            brands.logo,
                            brands.link
                        from
                            categorybrands
                            left join brands on brands.id = categorybrands.brandId
                            left join categories on categories.id = categorybrands.categoryId
                        where
                            categories.name = "Điện thoại";`;

      const [response] = await db.sequelize.query(query);

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get data successfully" : "Get data failure",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
