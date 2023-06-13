import React from "react"
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import { ErrorMessage, Field } from "formik"
import { useSelector } from "react-redux"
import { selectorUser } from "~/redux/userSlice"

const Role = ({ props }) => {
    const roles = useSelector(selectorUser)?.roles

    const handleChange = (event) => {
        props.setFieldValue("role", event.target.value)
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tài khoản dành cho</InputLabel>
                <Field
                    as={Select}
                    name="role"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tài khoản dành cho"
                    onChange={handleChange}
                >
                    {Array.isArray(roles) &&
                        roles.map((item) => (
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
    )
}

export default Role
