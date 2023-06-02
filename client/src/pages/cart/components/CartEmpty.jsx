import { Box } from "@mui/material"
import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { PF } from "~/utils/__variables"

const CartEmpty = () => {
    return (
        <Fragment>
            <Box
                sx={{
                    height: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ pointerEvents: "none" }}>
                    <img src={PF + "/assets/cart/empty-cart-removebg-preview.png"} alt="" width="270px" />
                </Box>
                <Box
                    sx={{
                        pointerEvents: "none",
                        margin: 2,
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#666",
                    }}
                >
                    Giỏ hàng của bạn còn trống
                </Box>
                <Link to="/">
                    <Box
                        sx={{
                            color: "#fff",
                            backgroundColor: "dodgerblue",
                            textTransform: "uppercase",
                            padding: "10px 30px",
                            borderRadius: "5px",
                        }}
                    >
                        Mua ngay
                    </Box>
                </Link>
            </Box>
        </Fragment>
    )
}

export default CartEmpty
