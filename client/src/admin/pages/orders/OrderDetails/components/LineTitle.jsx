import { Box, Checkbox, Typography } from "@mui/material"
import React from "react"

const LineTitle = () => {
    return (
        <Box className="title col">
            <Box className="col-0">
                <Checkbox />
            </Box>
            <Box className="col-1">
                <Typography>Sản phẩm</Typography>
            </Box>
            <Box className="col-2">
                <Typography>Đơn giá</Typography>
            </Box>
            <Box className="col-3">
                <Typography>Số lượng</Typography>
            </Box>
            <Box className="col-4">
                <Typography>Số tiền</Typography>
            </Box>
            <Box className="col-5">
                <Typography>Thao tác</Typography>
            </Box>
        </Box>
    )
}

export default LineTitle
