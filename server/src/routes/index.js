// routes/index.jsx

const authRoute = require("./authRoute");

const initRoute = (app) => {
  // Routes
  app.use("/api/v1/auth", authRoute);

  return app.use("/", (req, res) => {
    return res.send("SERVER ON");
  });
};

module.exports = initRoute;
