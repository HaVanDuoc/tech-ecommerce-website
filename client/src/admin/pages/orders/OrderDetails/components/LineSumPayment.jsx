import React from "react"
import { Box, Typography, styled } from "@mui/material"
import ButtonAddProduct from "../../components/ButtonAddProduct"
import { formatVND } from "~/helper/format"
import { actionConfirm, handleButtonConfirm } from "../../components/handleConfirm"
import axiosInstance from "~/api"

const LineSumPayment = ({ order_status, order_list, order_id, reset, setReset, payment, order_code }) => {
    const buttonConfirm = handleButtonConfirm(order_status)

    const handleClick = (actionConfirm, actionConfirmed, codeOrder) => {
        setTimeout(async () => {
            await axiosInstance("post", "/order/handleOrderStatus", {
                actionConfirm,
                actionConfirmed,
                codeOrder,
            })
            setReset(!reset)
        }, 1000)
    }

    return (
        <Payment>
            <Box sx={style1}>
                {order_status === "Chờ xác nhận" && (
                    <ButtonAddProduct order_detail_id={order_id} reset={reset} setReset={setReset} />
                )}

                <Box sx={style2}>
                    <Typography>
                        Tổng tiền ({order_list ? order_list.length : 0} sản phẩm):{" "}
                        <Typography id="total-money" variant="span" sx={style3}>
                            {formatVND(payment)}
                        </Typography>
                    </Typography>

                    {buttonConfirm?.action.map((item, index) => {
                        return (
                            <Box key={index} sx={style4} onClick={() => handleClick(actionConfirm, item, order_code)}>
                                {item}
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Payment>
    )
}

export default LineSumPayment

const Payment = styled(Box)(() => ({
    borderRadius: "0 0 5px 5px",
    boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#fff",
    position: "sticky",
    bottom: 0,
    zIndex: 2,
}))

const style1 = {
    padding: "10px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}

const style2 = {
    display: "flex",
    flex: 1,
    justifyContent: "end",
    alignItems: "center",
    flexDirection: "row",
}

const style3 = {
    color: "crimson",
    fontWeight: 600,
    fontSize: "1.2rem",
}

const style4 = {
    marginLeft: 3,
    backgroundColor: "crimson",
    border: "1px solid crimson",
    borderRadius: "5px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 30px",
    cursor: "pointer",
    boxShadow: "0 1px 5px 1px rgba(0, 0, 0, 0.25)",
    transition: "all .2s ease-in-out",

    ":hover": {
        boxShadow: "0 1px 5px 5px rgba(0, 0, 0, 0.25)",
    },
}
