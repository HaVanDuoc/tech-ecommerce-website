const db = require("../../../models");

exports.productsService = (category, page, brandParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const limit = 12;
      const offset = limit * (page - 1);

      // Get products
      const query = `select
                        products.productId,
                        products.name,
                        products.image,
                        products.price,
                        products.discount,
                        products.rating,
                        products.stock,
                        brands.name as 'brand',
                        categories.name as 'category',
                        categories.link as 'linkCategory'
                    from
                        products
                        left join categories on categories.categoryId = products.categoryId
                        left join brands on brands.brandId = products.brandId
                    where
                        categories.name = "${category}"
                        ${
                          brandParams
                            ? 'and brands.name = "' + brandParams + '"'
                            : ""
                        }
                    limit
                        ${limit}
                    offset
                        ${offset};`;

      const [products] = await db.sequelize.query(query);

      //   Get count all products
      const [countAll] = await db.sequelize.query(
        `select
            count(*) as 'count'
        from
            products
            left join categories on categories.categoryId = products.categoryId
            left join brands on brands.brandId = products.brandId
        where
            categories.name = "${category}"
            ${brandParams ? 'and brands.name = "' + brandParams + '"' : ""};`
      );

      resolve({
        err: products ? 0 : 1,
        msg: products ? "Get data successfully" : "Get data failure",
        data: products ? products : null,
        category: category ? category : null,
        countPage: Math.floor(countAll[0].count / limit) + 1,
        currentPage: page ? page : null,
        countProducts: countAll ? countAll[0].count : null,
        limit: limit ? limit : null,
      });
    } catch (error) {
      reject(error);
    }
  });
