import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Field } from "formik";
import React from "react";
import { FetchGender } from "~/helper/fetch";

const RadioGender = () => {
  const [gender, setGender] = React.useState([]);
  const fetchGender = FetchGender();

  React.useEffect(() => {
    setGender(fetchGender);
  }, [fetchGender]);

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {gender.map((item, index) => (
          <Field
            key={index}
            as={FormControlLabel}
            name="genderCode"
            value={item.code}
            control={<Radio size="small" />}
            label={item.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGender;
