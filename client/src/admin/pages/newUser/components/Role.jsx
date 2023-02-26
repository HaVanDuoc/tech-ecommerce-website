import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FetchRoleList } from "~/helper/fetch";
import { ErrorMessage, Field } from "formik";

const Role = ({ props }) => {
  // FETCH ROLE LIST
  const [listRole, setListRole] = React.useState([]);

  const roleList = FetchRoleList();
  React.useEffect(() => {
    setListRole(roleList);
  }, [roleList]);

  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
    props.setFieldValue("role", event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Tài khoản dành cho
        </InputLabel>
        <Field
          as={Select}
          name="role"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Tài khoản dành cho"
          onChange={handleChange}
        >
          {Array.isArray(listRole) &&
            listRole.map((item) => (
              <MenuItem key={item.id} value={item.roleId}>
                {item.name}
              </MenuItem>
            ))}
        </Field>
      </FormControl>

      <FormHelperText>
        <ErrorMessage name="role" />
      </FormHelperText>
    </Box>
  );
};

export default Role;
