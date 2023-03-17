const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const initRoute = require("./routes");
const bodyParser= require('body-parser')

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json({ limit: "250mb" }));
dotenv.config();
app.use(cors());
app.use(morgan("common"));

// Connect to DB
require("./connectDB");

// Routes
initRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
