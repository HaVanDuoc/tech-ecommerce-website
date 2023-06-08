import { Box, Typography } from "@mui/material"
import React from "react"

const Title = ({ children }) => {
    return (
        <Box>
            <Typography
                sx={{
                    color: "#000",
                    fontSize: "24px",
                    fontWeight: 500,
                    textTransform: "capitalize",
                }}
            >
                {children}
            </Typography>
        </Box>
    )
}

export default Title
