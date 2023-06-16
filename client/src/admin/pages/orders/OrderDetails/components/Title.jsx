import { Stack, Typography } from "@mui/material"
import React from "react"

const Title = ({ children }) => {
    return (
        <Stack>
            <Typography color="#666" fontWeight={500} marginBottom={1}>
                {children}
            </Typography>
        </Stack>
    )
}

export default Title
