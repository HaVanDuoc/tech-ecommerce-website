import { Box, Button, Container, Grid } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { requestGetBrandsByCategory } from "~/api"
import { selectorBrand } from "~/redux/brandSlice"
import { reFetchProductPage, resetSateProductByCategory } from "~/redux/productSlice"
import addOrUpdateURLParams from "~/utils/addURLParams"

const ListBrands = () => {
    const dispatch = useDispatch()
    const brands = useSelector(selectorBrand)
    const currentPageLink = useParams().category

    useEffect(() => {
        if (brands[`/${currentPageLink}`]) return
        requestGetBrandsByCategory(dispatch, currentPageLink)
    }, [dispatch, currentPageLink, brands])

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
                        {brands[`/${currentPageLink}`]?.map((item, index) => (
                            <Grid item xs={1.5} key={index}>
                                <Button
                                    onClick={() => handleClick(item.brandName)}
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
                                    <img src={item.logo} alt={item.brandName} width="100%" height="23px" />
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            }
        </Box>
    )
}

export default ListBrands
