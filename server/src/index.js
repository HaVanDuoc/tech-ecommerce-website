const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoute = require("./routes/authRoute");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to DB
require("./db");

// Middleware
app.use(cors());

// Routes
app.use("/server/auth/", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
