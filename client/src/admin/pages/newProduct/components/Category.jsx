import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

const Categories = () => {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth size="small">
        <InputLabel>Phân loại</InputLabel>
        <Select
          label="Phân loại"
          value={category}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default Categories;
