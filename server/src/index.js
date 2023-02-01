const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const db = require("./db");
const initRoute = require("./routes");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
dotenv.config();
app.use(cors());
app.use(morgan("common"));
app.use(express.json());

// Connect to DB
require("./db");

// Routes
initRoute(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
