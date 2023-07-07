import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import { ErrorMessage, Field } from "formik"
import React from "react"
import { useSelector } from "react-redux"
import { selectorUser } from "~/redux/userSlice"

const Gender = () => {
    const gender = useSelector(selectorUser)?.gender

    console.log("gender", gender)

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
                    {gender &&
                        gender.length &&
                        gender.map((item) => (
                            <Field
                                as={FormControlLabel}
                                name="gender"
                                value={item.code}
                                control={<Radio size="small" />}
                                label={item.name}
                            />
                        ))}
                </RadioGroup>
            </FormControl>

            <FormHelperText>
                <ErrorMessage name="gender" />
            </FormHelperText>
        </Box>
    )
}

export default Gender
