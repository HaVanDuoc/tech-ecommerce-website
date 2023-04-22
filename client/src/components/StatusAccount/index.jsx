import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Field } from "formik";
import React from "react";
import { formatStatus } from "~/admin/pages/user/components/formatStatus";
import { FetchStatusAccount } from "~/helper/fetch";
import { formatCapitalization } from "~/helper/format";

const StatusAccount = () => {
  const [status, setStatus] = React.useState([]);
  const fetchStatus = FetchStatusAccount();

  React.useEffect(() => {
    setStatus(fetchStatus);
  }, [fetchStatus]);

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Trạng thái</FormLabel>
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
            label={formatCapitalization(formatStatus(item.name))}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default StatusAccount;
