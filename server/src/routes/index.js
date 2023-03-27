// routes/index.jsx

const { notFound } = require("../middleware/handleError");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const adminRoute = require("./adminRoute");
const dbRoute = require("./dbRoute");
const clientRoute = require("./client");
const sectionProduct = require("./sectionProduct");
const pageProduct = require("./pageProduct");
const header = require("./client/header");
const categories = require("./client/categories");
const productDetails = require("./client/productDetails");
const products = require("./admin/products");

const initRoute = (app) => {
  // Routes
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/admin", adminRoute);
  app.use("/api/v1/db", dbRoute);
  app.use("/api/v1/client", clientRoute);
  app.use("/api/v1/sectionProduct", sectionProduct); // Section list Product
  app.use("/api/v1/client/header", header); // Section list Product
  app.use("/api/v1/client/categories", categories); //
  app.use("/api/v1/client/productDetails", productDetails); //

  // Client routes
  app.use("/api/v1/client/pageProduct/", pageProduct);

  // Admin routes
  app.use("/api/v1/admin/products", products);

  // Route không xác định được response error not found
  return app.use(notFound);
};

module.exports = initRoute;
