import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ErrorMessage, Field } from "formik";
import React from "react";

const Gender = () => {
  return (
    <Box>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          size="small"
        >
          <Field
            as={FormControlLabel}
            name="gender"
            value="0"
            control={<Radio size="small" />}
            label="Nam"
          />
          <Field
            as={FormControlLabel}
            name="gender"
            value="1"
            control={<Radio size="small" />}
            label="Nữ"
          />
        </RadioGroup>
      </FormControl>

      <FormHelperText>
        <ErrorMessage name="gender" />
      </FormHelperText>
    </Box>
  );
};

export default Gender;
