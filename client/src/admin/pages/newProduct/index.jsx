import "./newProduct.css";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
const { formatVND } = require("~/helper/format");

const products = [
  {
    label: "Tên sản phẩm",
    placeholder: "iPhone 14 Pro Max",
    type: "text",
    size: "small",
  },
  {
    label: "Giá",
    placeholder: `${formatVND(10000000)}`,
    type: "number",
    size: "small",
  },
  {
    label: "Số lượng nhập kho",
    placeholder: "iPhone 14 Pro Max",
    type: "number",
    size: "small",
  },
];

const Categories = () => {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Fragment>
      <FormControl fullWidth size="small">
        <Typography fontSize="1rem" fontWeight={500}>
          Phân loại
        </Typography>
        <Select
          value={category}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>(Chưa chọn)</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
    </Fragment>
  );
};

export default function NewProduct() {
  return (
    <div className="newProduct">
      <Typography variant="h4" marginBottom={4}>
        Sản phẩm mới
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          {products.map((item, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography fontSize="1rem" fontWeight={500}>
                {item.label}
              </Typography>
              <TextField
                variant="outlined"
                type={item.type}
                placeholder={item.placeholder}
                fullWidth
                size={item.size}
              />
            </Box>
          ))}

          <Categories />
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </div>
  );
}
