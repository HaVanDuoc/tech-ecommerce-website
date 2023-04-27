const db = require("../../../models");

exports.sectionBrands = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `select
                            brands.name,
                            brands.logo,
                            brands.view
                        from
                            categorybrands
                            left join brands on brands.id = categorybrands.brandId
                            left join categories on categories.id = categorybrands.categoryId
                        where
                            categories.name = "${data}" 
                        order by 
                            brands.view desc;`;

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
