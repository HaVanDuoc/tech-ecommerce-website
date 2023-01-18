import express from "express";
import authRoutes from "./routes/auth.js";
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/server/auth/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
