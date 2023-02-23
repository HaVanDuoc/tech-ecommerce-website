import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";
import { Field } from "formik";
import React from "react";
import { FetchListRole } from "~/helper/fetch";

const SelectRole = () => {
  const [options, setOptions] = React.useState([]);

  const listRole = FetchListRole();
  React.useEffect(() => {
    setOptions(listRole);
  }, [listRole]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Tài khoản dành cho
      </InputLabel>
      <FormControl fullWidth>
        <Field
          as={NativeSelect}
          id="roleId"
          name="roleId"
          defaultValue={options[0]?.roleId}
        >
          {options.map((item, index) => (
            <option key={index} value={item.roleId}>
              {item.name}
            </option>
          ))}
        </Field>
      </FormControl>
    </Box>
  );
};

export default SelectRole;
