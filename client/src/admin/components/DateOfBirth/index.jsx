import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Field } from "formik";
import React from "react";

const DateOfBirth = ({ props }) => {
  const [value, setValue] = React.useState(dayjs(new Date())); // Date of birth

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Ngày sinh"
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          props.setFieldValue("birthday", newValue);
        }}
        renderInput={(params) => {
          return <Field as={TextField} name="birthday" {...params} />;
        }}
      />
    </LocalizationProvider>
  );
};

export default DateOfBirth;
