// routes/index.jsx

const { notFound } = require("../middleware/handleError");
const authRoute = require("./client/auth/authRoute");
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
const home = require("./client/home");
const productsClient = require("./client/products");
const cart = require("./client/cart");
const profile = require("./client/profile");
const search = require("./client/search");
const orders = require("./admin/orders");
const users = require("./admin/users");

const initRoute = (app) => {
  // Routes
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/admin", adminRoute);
  app.use("/api/v1/db", dbRoute);
  app.use("/api/v1/client", clientRoute);
  app.use("/api/v1/sectionProduct", sectionProduct); // Section list Product
  app.use("/api/v1/client/header", header); // Section list Product
  app.use("/api/v1/client/categories", categories); //
  app.use("/api/v1/client/productDetails", productDetails); //

  // Client routes
  app.use("/api/v1/client/auth", authRoute);
  app.use("/api/v1/client/pageProduct/", pageProduct);
  app.use("/api/v1/client/home", home);
  app.use("/api/v1/client/products", productsClient);
  app.use("/api/v1/client/cart", cart);
  app.use("/api/v1/client/profile", profile);
  app.use("/api/v1/client/search", search);

  // Admin routes
  app.use("/api/v1/admin/users", users);
  app.use("/api/v1/admin/products", products);
  app.use("/api/v1/admin/orders", orders);

  // Route không xác định được response error not found
  return app.use(notFound);
};

module.exports = initRoute;
