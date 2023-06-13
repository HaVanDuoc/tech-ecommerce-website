import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { formatCapitalization } from "~/helper/format"
import { Field } from "formik"
import React from "react"
import { selectorUser } from "~/redux/userSlice"
import { useSelector } from "react-redux"

const StatusAccount = () => {
    const fetch = useSelector(selectorUser)
    const status = fetch?.status

    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Trạng thái</FormLabel>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                {status.length &&
                    status.map((item, index) => (
                        <Field
                            key={index}
                            as={FormControlLabel}
                            name="statusId"
                            value={item.statusId}
                            control={<Radio size="small" />}
                            label={formatCapitalization(item.name)}
                        />
                    ))}
            </RadioGroup>
        </FormControl>
    )
}

export default StatusAccount
