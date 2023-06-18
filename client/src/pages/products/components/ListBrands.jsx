import { Box, Button, Container, Grid } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { requestBrands } from "~/api"
import { selectorBrands } from "~/redux/brandSlice"
import { reFetchProductPage, resetSateProductByCategory } from "~/redux/productSlice"
import addOrUpdateURLParams from "~/utils/addURLParams"

const ListBrands = () => {
    const dispatch = useDispatch()
    const category = useParams().category
    const brands = useSelector(selectorBrands)
    const payload = brands?.payload && brands?.payload[`${category}`]

    useEffect(() => {
        if (!payload) requestBrands(dispatch, { alias: category })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    const handleClick = (brand) => {
        addOrUpdateURLParams("brand", brand)
        dispatch(resetSateProductByCategory())
        dispatch(reFetchProductPage())
    }

    return (
        <Box>
            {
                <Container maxWidth="lg" disableGutters>
                    <Grid container spacing={2}>
                        {payload &&
                            payload.map((item, index) => {
                                const name = item.name
                                const image = item.image[0].path

                                return (
                                    <Grid item xs={1.5} key={index}>
                                        <Button
                                            onClick={() => handleClick(name)}
                                            style={{
                                                width: "100%",
                                                minHeight: "40px",
                                                backgroundColor: "white",
                                                border: "1px solid #e0e0e0",
                                                borderRadius: "50px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: "8px 17px",
                                                overflow: "hidden",

                                                "&::hover": {
                                                    borderColor: "dodgerblue",
                                                },
                                            }}
                                        >
                                            <img src={image} alt={name} width="100%" height="23px" />
                                        </Button>
                                    </Grid>
                                )
                            })}
                    </Grid>
                </Container>
            }
        </Box>
    )
}

export default ListBrands
