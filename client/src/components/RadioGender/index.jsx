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
import { formatCapitalization } from "~/helper/format";

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
            as={FormControlLabel}
            key={index}
            name="genderCode"
            value={item.code}
            control={<Radio size="small" />}
            label={formatCapitalization(item.name)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGender;
