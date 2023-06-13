import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { Field } from "formik"
import React from "react"
import { useSelector } from "react-redux"
import { formatCapitalization } from "~/helper/format"
import { selectorUser } from "~/redux/userSlice"

const RadioGender = () => {
    const gender = useSelector(selectorUser)?.gender

    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                {gender.length &&
                    gender.map((item, index) => (
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
    )
}

export default RadioGender
