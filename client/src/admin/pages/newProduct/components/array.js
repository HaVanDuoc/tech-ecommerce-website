import { TextField } from "@mui/material";

export const products = [
  {
    as: TextField,
    label: "Tên sản phẩm",
    type: "text",
    name: "name",
  },
  {
    as: TextField,
    label: "Giá",
    type: "number",
    name: "price",
  },
  {
    as: TextField,
    label: "Số lượng nhập kho",
    type: "number",
    name: "stock",
  },
];
