import styled from "@emotion/styled"
import { Box, Button, Stack, Typography } from "@mui/material"
import React, { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { reFetchProductPage, resetSateProductByCategory, selectorProductByCategory } from "~/redux/productSlice"
import addOrUpdateURLParams from "~/utils/addURLParams"

const Styled = styled(Box)(() => ({
    ".wrapper": {
        backgroundColor: "#fff",
        boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)",
        borderRadius: "5px",
        padding: "10px 16px",

        "& button": {
            margin: "0 5px",
        },
    },
}))

const SortBy = () => {
    const products = useSelector(selectorProductByCategory)
    const category = useParams().category
    const dispatch = useDispatch()

    const handleClick = (e) => {
        addOrUpdateURLParams("sortBy", e.target.value)
        dispatch(resetSateProductByCategory())
        dispatch(reFetchProductPage())
    }

    return (
        <Styled>
            <Box className="wrapper">
                <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="span" fontWeight={500}>
                            Xếp theo
                        </Typography>

                        <Button value="discount" onClick={handleClick}>
                            Sale
                        </Button>
                        <Button value="createdAt" onClick={handleClick}>
                            Mới nhất
                        </Button>
                        <Button>Bán chạy</Button>
                    </Box>

                    <Box>
                        {products.isPending ? (
                            <Fragment />
                        ) : products[`${category}`] && products[`${category}`].counterProduct > 0 ? (
                            <Typography sx={{ fontWeight: 500 }}>
                                {products[`${category}`]?.counterProduct}{" "}
                                {products[`${category}`] && products[`${category}`]["page-1"]
                                    ? products[`${category}`]["page-1"][0].product_category
                                    : "Sản phẩm"}
                            </Typography>
                        ) : (
                            <Typography sx={{ fontWeight: 500 }}>Chưa có sản phẩm nào!</Typography>
                        )}
                    </Box>
                </Stack>
            </Box>
        </Styled>
    )
}

export default SortBy
