import { Stack } from "@mui/material"
import React from "react"

const LineOption = ({ children }) => {
    return (
        <Stack
            minHeight={70}
            flex={1}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)", padding: 2 }}
        >
            {children}
        </Stack>
    )
}

export default LineOption
