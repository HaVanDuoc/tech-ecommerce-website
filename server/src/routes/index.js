// routes/index.jsx

const { notFound } = require("../middleware/handleError");
const authRoute = require("./authRoute");

const initRoute = (app) => {
  // Routes
  app.use("/api/v1/auth", authRoute);

  // Route không xác định được response error not found
  return app.use(notFound);
};

module.exports = initRoute;
