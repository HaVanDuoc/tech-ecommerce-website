import { Box, CircularProgress } from "@mui/material"
import React from "react"

const Loading = () => {
    return (
        <Box
            sx={{
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <CircularProgress />
            <Box
                sx={{
                    pointerEvents: "none",
                    margin: 2,
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#666",
                }}
            >
                Đang xử lý...
            </Box>
        </Box>
    )
}

export default Loading
