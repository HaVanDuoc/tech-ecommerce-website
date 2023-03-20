import { FetchBrand } from "~/helper/fetch";
import { formatCapitalization } from "~/helper/format";

const {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
} = require("@mui/material");
const { Field, ErrorMessage } = require("formik");
const { useEffect, useState } = require("react");

const SelectBrand = ({ props, name, categoryId }) => {
  const [listBrand, setListBrand] = useState([]);

  // Fetch list brand
  const brandList = FetchBrand(categoryId);
  useEffect(() => {
    setListBrand(brandList);
  }, [brandList]);

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    props.setFieldValue(name, event.target.value);
  };

  return (
    <Box>
      <FormControl>
        <FormLabel sx={{ marginBottom: 1 }}>Chọn thương hiệu</FormLabel>
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
          {Array.isArray(listBrand) &&
            listBrand.map((item) => (
              <FormControlLabel
                key={item.id}
                name={item.name}
                value={item.brandId}
                control={<Radio />}
                label={
                  <Chip
                    label={formatCapitalization(item.name)}
                    variant={value === item.brandId ? "contained" : "outlined"}
                    color={value === item.brandId ? "primary" : "default"}
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
  );
};

export default SelectBrand;
