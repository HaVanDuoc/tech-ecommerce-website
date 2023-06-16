import { Box, Stack, Typography } from "@mui/material"
import dayjs from "dayjs"
import React from "react"

const LineInfoOrder = ({ order_code, createdAt, order_status }) => {
    return (
        <Stack sx={styles1}>
            <Box>
                <Typography variant="span" fontWeight={500}>
                    Đơn hàng{" "}
                </Typography>
                <Typography variant="span" color="dodgerblue" fontWeight={500}>
                    {order_code}
                </Typography>
            </Box>

            <Stack flexDirection="row" alignItems="center">
                <Typography variant="span" fontWeight={500}>
                    Ngày đặt{" "}
                </Typography>
                <Typography variant="span" fontWeight={500} color="dodgerblue" marginLeft={0.8} marginRight={2}>
                    {dayjs(createdAt).format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="span" fontWeight={500} color="crimson" textTransform="uppercase">
                    {order_status}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default LineInfoOrder

const styles1 = {
    padding: "24px 16px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
}
