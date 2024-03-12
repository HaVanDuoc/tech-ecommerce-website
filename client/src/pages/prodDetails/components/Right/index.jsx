import React from "react"
import { Box, Stack } from "@mui/material"
import ButtonAddCart from "./components/ButtonAddCart"
import ButtonOrder from "./components/ButtonOrder"
import RatingLine from "./components/RatingLine"
import Price from "./components/Price"
import NameProduct from "./components/NameProduct"
import Category from "./components/Category"

const Right = () => {
    return (
        <Box sx={styles1}>
            <Category />

            <NameProduct />

            <Price />

            <RatingLine />

            <Stack flexDirection="row" marginTop={6} sx={styles2}>
                <ButtonAddCart />
                <ButtonOrder />
            </Stack>
        </Box>
    )
}

export default Right

const styles1 = {
    width: "100%",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
}

const styles2 = {
    "& :nth-child(n)": {
        marginLeft: 1,
        marginRight: 1,
    },
}
