import { Stack } from "@mui/material"
import React from "react"

const FieldInfo = ({ index, name, value }) => {
    return (
        <Stack flexDirection="row" justifyContent="start" alignItems="center" key={index}>
            <Stack mr={2}>{name}</Stack>
            <Stack fontWeight={500}>{value}</Stack>
        </Stack>
    )
}

export default FieldInfo
