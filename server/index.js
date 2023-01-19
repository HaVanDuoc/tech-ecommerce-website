import express from "express";
import { db } from "./db.js";
import authRoutes from "./routes/auth.js";
const app = express();

const PORT = process.env.PORT || 4000;

// Connect to DB
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to mySQL success...");
  }
});

// Routes
app.use("/server/auth/", authRoutes);

// app.post("/test", (req, res) => {
//   const query =
//     "CREATE TABLE `ecommercetech`.`test`(`id` INT NOT NULL AUTO_INCREMENT, `test` VARCHAR(255) NULL, PRIMARY KEY (`id`))";

//   db.query(query, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
