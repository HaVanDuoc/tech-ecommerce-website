import { Box, CircularProgress, Container, Grid, Stack, styled, Typography } from "@mui/material"
import { reFetchProductPage, selectorProductByCategory } from "~/redux/productSlice"
import { default as SliderMaterial } from "@mui/material/Slider"
import SectionCategories from "./components/SectionCategories"
import AppBar from "~/components/Header/components/AppBar"
import PaginationCustomize from "~/components/Pagination"
import { useDispatch, useSelector } from "react-redux"
import ListBrands from "./components/ListBrands"
import removeEmpty from "~/helper/removeEmpty"
import { useParams } from "react-router-dom"
import { formatVND } from "~/helper/format"
import { requestGetProducts } from "~/api"
import React, { useEffect } from "react"
import Banner from "./components/Banner"
import SortBy from "./components/SortBy"
import { Footer } from "~/components"
import Card from "~/components/Card"
import "~/styles/slider"

const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector(selectorProductByCategory)

    const category = useParams().category
    const page = Number(new URLSearchParams(window.location.search).get("page")) || 1
    const brand = new URLSearchParams(window.location.search).get("brand")
    const sortBy = new URLSearchParams(window.location.search).get("sortBy")

    useEffect(() => {
        // Stop handle when data available
        if (products[`${category}`] && products[`${category}`][`page-${page}`]) return

        const config = {
            category,
            page,
            brand,
            sortBy,
        }

        requestGetProducts(dispatch, removeEmpty(config))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, category, page, brand, sortBy])

    return (
        <Wrapper>
            <Box sx={styles1}>
                <AppBar />
            </Box>

            <Banner />

            <Body>
                <Container maxWidth="lg" disableGutters>
                    <Box sx={{ marginBottom: 2 }}>
                        <ListBrands />
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={2.5}>
                            <SectionCategories />

                            {/* <Box className="box filter">
                                <Typography className="title">Bộ lọc</Typography>
                                <Box sx={{ padding: "0 16px" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Giá</Typography>
                                    <SliderPrice />
                                </Box>
                            </Box> */}
                        </Grid>

                        <Grid item xs>
                            <SortBy />

                            {products.isPending ? (
                                <Loading />
                            ) : (
                                <ListProduct>
                                    <Grid container spacing={1}>
                                        {products &&
                                            products[`${category}`] &&
                                            products[`${category}`][`page-${page}`]?.map((item, index) => {
                                                return (
                                                    <Grid item xs={3} key={index}>
                                                        <Card product={item} />
                                                    </Grid>
                                                )
                                            })}
                                    </Grid>

                                    {products[`${category}`]?.counterPage > 1 && (
                                        <Stack alignItems="center" justifyContent="center" marginTop={5}>
                                            <PaginationCustomize
                                                counterPage={products[`${category}`]?.counterPage}
                                                refetch={reFetchProductPage()}
                                            />
                                        </Stack>
                                    )}
                                </ListProduct>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Body>

            <Footer />
        </Wrapper>
    )
}

export default Products

const Loading = () => (
    <Stack flexDirection="column" justifyContent="center" alignItems="center" width="100%" height={460}>
        <CircularProgress />
        <Typography marginTop={2}>Chờ chút xíu...</Typography>
    </Stack>
)

const styles1 = {
    backgroundColor: "#fff",
    boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)",
}

const Wrapper = styled(Box)(() => ({
    minHeight: "500px",

    ".box": {
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
        paddingBottom: "16px",

        ".list": {
            // maxHeight: "300px",
            overflowY: "scroll",
        },

        ".title": {
            padding: "16px 24px",
            fontSize: "18px",
            fontWeight: 500,
        },

        ".item": {
            margin: "0 8px",
            padding: "0 16px",
            color: "#666",
            lineHeight: "35px",
            cursor: "pointer",
            transition: "all .3s ease",
            backgroundColor: "#fff",
            borderRadius: "5px",

            ":hover": {
                color: "var(--color-main)",
                backgroundColor: "#eee",
            },
        },
    },

    ".categories": {
        ".item.selected": {
            color: "var(--color-main)",
            backgroundColor: "#eee",
        },
    },

    ".filter": {},
}))

const ListProduct = styled(Box)(() => ({
    padding: "15px 0",
}))

const SliderPrice = () => {
    const [value, setValue] = React.useState()

    const handleChange = (event, newValue) => {
        if (typeof newValue === "number") {
            setValue(newValue)
        }
    }

    const valueLabelFormat = (value) => {
        return formatVND(value)
    }

    return (
        <SliderMaterial
            value={value}
            min={500000}
            max={50000000}
            step={100000}
            getAriaValueText={valueLabelFormat}
            valueLabelFormat={valueLabelFormat}
            onChange={handleChange}
            valueLabelDisplay="auto"
        />
    )
}

const Body = styled(Box)(() => ({}))
