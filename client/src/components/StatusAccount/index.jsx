import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Field } from "formik";
import React from "react";
import { FetchStatusAccount } from "~/helper/fetch";

const StatusAccount = () => {
  const [status, setStatus] = React.useState([]);
  const fetchStatus = FetchStatusAccount();

  React.useEffect(() => {
    setStatus(fetchStatus);
  }, [fetchStatus]);

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {status.map((item, index) => (
          <Field
            key={index}
            as={FormControlLabel}
            name="statusId"
            value={item.statusId}
            control={<Radio size="small" />}
            label={item.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default StatusAccount;
