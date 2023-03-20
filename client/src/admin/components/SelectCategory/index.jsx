import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import { FetchCategorySelect } from "~/helper/fetch";
import { formatCapitalization } from "~/helper/format";
import SelectBrand from "./SelectBrand";

const SelectCategory = ({ props, name }) => {
  const [listCategory, setListCategory] = useState([]);

  // Fetch list category
  const categoryList = FetchCategorySelect();
  React.useEffect(() => {
    setListCategory(categoryList);
  }, [categoryList]);

  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    props.setFieldValue(name, event.target.value);
  };

  return (
    <Box>
      {/* Phân loại */}
      <Box>
        <FormControl>
          <FormLabel sx={{ marginBottom: 1 }}>Phân loại</FormLabel>
          <Field
            as={RadioGroup}
            row
            name={name}
            value={value}
            onChange={handleChange}
            sx={{
              "& .MuiRadio-root ": {
                display: "none",
              },
            }}
          >
            {Array.isArray(listCategory) &&
              listCategory.map((item) => (
                <FormControlLabel
                  key={item.id}
                  name={item.name}
                  value={item.categoryId}
                  control={<Radio />}
                  label={
                    <Chip
                      label={formatCapitalization(item.name)}
                      variant={
                        value === item.categoryId ? "contained" : "outlined"
                      }
                      color={value === item.categoryId ? "primary" : "default"}
                      sx={{
                        marginLeft: 1,
                        marginBottom: 1,
                      }}
                    />
                  }
                />
              ))}
          </Field>
        </FormControl>

        <FormHelperText>
          <ErrorMessage name={name} />
        </FormHelperText>
      </Box>

      {/* Thương hiệu */}
      {value && <SelectBrand name="brand" props={props} categoryId={value} />}
    </Box>
  );
};

export default SelectCategory;
