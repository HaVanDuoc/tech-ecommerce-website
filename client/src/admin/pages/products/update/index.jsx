import Info from "./info"
import Image from "./image"
import { requestGetProduct } from "~/api"
import React, { useEffect } from "react"
import { AdminTitle } from "~/admin/Styled"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectorProduct } from "~/redux/productSlice"
import { Container, Divider, Grid, Stack } from "@mui/material"

const Update = () => {
    const dispatch = useDispatch()
    const productId = useParams().productId
    const product = useSelector(selectorProduct)

    useEffect(() => {
        requestGetProduct(dispatch, { productId })
    }, [dispatch, productId, product.reFetch])

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Title>
                        <AdminTitle>Thông tin sản phẩm</AdminTitle>
                    </Title>

                    <Divider sx={{ marginBottom: 4, color: "#555" }} />
                </Grid>

                <Grid item xs={6}>
                    <Image />
                </Grid>

                <Grid item xs={6}>
                    <Info />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Update

const Title = ({ children }) => {
    return (
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            {children}
        </Stack>
    )
}
