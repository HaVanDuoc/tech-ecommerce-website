// const { badRequest, unauthorized } = require("./handleError");
// const jwt = require("jsonwebtoken");

import jwt from "jsonwebtoken";
import { badRequest, unauthorized } from "./handleError";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return badRequest("Yêu cầu đăng nhập");

  // split: tách chuỗi thành mảng
  // access_token = Bearer token -> split access_token = ["Bearer", "token"]
  const accessToken = token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return unauthorized("Phiên đăng nhập hết hạn. Yêu cầu đăng nhập lại");

    req.user = user;
  });

  next();
};

export default verifyToken;
