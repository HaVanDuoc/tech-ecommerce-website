import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material"
import { Field } from "formik"
import React from "react"
import { useSelector } from "react-redux"
import { selectorUser } from "~/redux/userSlice"

const SelectRole = () => {
    const roles = useSelector(selectorUser)?.roles

    return (
        <Box sx={{ minWidth: 120 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Tài khoản dành cho
            </InputLabel>
            <FormControl fullWidth>
                <Field as={NativeSelect} id="roleId" name="roleId">
                    {roles.length &&
                        roles.map((item, index) => (
                            <option key={index} value={item.roleId}>
                                {item.name}
                            </option>
                        ))}
                </Field>
            </FormControl>
        </Box>
    )
}

export default SelectRole
