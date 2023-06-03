import { Box, Button, CircularProgress, Container, Grid, Stack, styled, Typography } from "@mui/material"
import { getProductByType, selectorProductByType } from "~/redux/productByTypeSlice"
import { convertURLParamsToCategory } from "./helpers/convertURLParamsToCategory"
import { default as SliderMaterial } from "@mui/material/Slider"
import SectionCategories from "./components/SectionCategories"
import React, { Fragment, useEffect, useState } from "react"
import PaginationCustomize from "~/components/Pagination"
import { useDispatch, useSelector } from "react-redux"
import axiosInstance from "~/utils/axiosInstance"
import ListBrands from "./components/ListBrands"
import { AppBar } from "~/components/Header"
import { useParams } from "react-router-dom"
import { formatVND } from "~/helper/format"
import Banner from "./components/Banner"
import { Footer } from "~/components"
import Card from "~/components/card"
import "~/styles/slider"

const Products = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(Number(new URLSearchParams(window.location.search).get("page")) || 1)
    const [isPending, setPending] = useState(false)
    const [brandParams, setBrandParams] = useState(new URLSearchParams(window.location.search).get("brand"))
    const dispatch = useDispatch()
    const current = useParams().category // get category of current page

    const products = useSelector(selectorProductByType)

    const category = convertURLParamsToCategory(current)

    const fetchProducts = async (category) => {
        setPending(true)

        const response = await axiosInstance({
            method: "post",
            url: "/client/products",
            data: { category, page, brandParams },
        })

        const config = {
            category: response.data.category,
            countPage: response.data.countPage,
            currentPage: response.data.currentPage,
            countProducts: response.data.countProducts,
            limit: response.data.limit,
            products: response.data.data,
        }

        dispatch(getProductByType(config))

        setPending(false)
    }

    useEffect(() => {
        window.scrollTo(0, 357)

        switch (current) {
            case "dien-thoai":
                if (!products.dienthoai.products[`page-${page}`]) fetchProducts("Điện thoại")
                setData(products.dienthoai)
                break

            case "tablet":
                if (!products.tablet.products[`page-${page}`]) fetchProducts("Tablet")
                setData(products.tablet)
                break

            case "laptop":
                if (!products.laptop.products[`page-${page}`]) fetchProducts("Laptop")
                setData(products.laptop)
                break

            case "tai-nghe":
                if (!products.tainghe.products[`page-${page}`]) fetchProducts("Tai nghe")
                setData(products.tainghe)
                break

            case "dong-ho":
                if (!products.dongho.products[`page-${page}`]) fetchProducts("Đồng hồ")
                setData(products.dongho)
                break

            case "pc":
                if (!products.pc.products[`page-${page}`]) fetchProducts("Pc")
                setData(products.pc)
                break

            case "sim":
                if (!products.sim.products[`page-${page}`]) fetchProducts("Sim")
                setData(products.sim)
                break

            case "may-giat":
                if (!products.maygiat.products[`page-${page}`]) fetchProducts("Máy giặt")
                setData(products.maygiat)
                break

            case "tivi":
                if (!products.tivi.products[`page-${page}`]) fetchProducts("Tivi")
                setData(products.tivi)
                break

            case "tu-lanh":
                if (!products.tulanh.products[`page-${page}`]) fetchProducts("Tủ lạnh")
                setData(products.tulanh)
                break

            case "loa":
                if (!products.loa.products[`page-${page}`]) fetchProducts("Loa")
                setData(products.loa)
                break

            case "quat-dieu-hoa":
                if (!products.quatdieuhoa.products[`page-${page}`]) fetchProducts("Quạt điều hòa")
                setData(products.quatdieuhoa)
                break

            default:
                break
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, products, current, brandParams])

    useEffect(() => {
        window.scrollTo(0, 357)
        fetchProducts(convertURLParamsToCategory(current))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brandParams])

    return (
        <Wrapper>
            {/* AppBar */}
            <Box
                sx={{
                    backgroundColor: "#fff",
                    boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)",
                }}
            >
                <AppBar />
            </Box>

            <Banner page={current} />

            <Body>
                <Container maxWidth="lg" disableGutters>
                    {/* Brands */}
                    <Box sx={{ marginBottom: 2 }}>
                        <ListBrands setBrandParams={setBrandParams} />
                    </Box>

                    {/*  */}
                    <Grid container spacing={2}>
                        <Grid item xs={2.5}>
                            {/* Danh muc */}
                            <SectionCategories category={category} setPage={setPage} setBrandParams={setBrandParams} />

                            {/* Bộ lọc */}
                            <Box className="box filter">
                                <Typography className="title">Bộ lọc</Typography>

                                <Box sx={{ padding: "0 16px" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Giá</Typography>
                                    <SliderPrice />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs>
                            {/* Xếp theo */}
                            <SortBy>
                                <Box className="wrapper">
                                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Typography variant="span" fontWeight={500}>
                                                Xếp theo
                                            </Typography>

                                            <Button>Sale</Button>
                                            <Button>Mới nhất</Button>
                                            <Button>Bán chạy</Button>
                                        </Box>

                                        <Box>
                                            {isPending ? (
                                                <Fragment />
                                            ) : data.countProducts > 0 ? (
                                                <Typography sx={{ fontWeight: 500 }}>
                                                    {`${data.countProducts} ${data.category}`}
                                                </Typography>
                                            ) : (
                                                <Typography sx={{ fontWeight: 500 }}>Chưa có sản phẩm nào!</Typography>
                                            )}
                                        </Box>
                                    </Stack>
                                </Box>
                            </SortBy>

                            {/* sản phẩm */}
                            {isPending ? (
                                <Stack
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    width="100%"
                                    height={460}
                                >
                                    <CircularProgress />
                                    <Typography marginTop={2}>Chờ chút xíu...</Typography>
                                </Stack>
                            ) : (
                                <ListProduct>
                                    <Grid container spacing={1}>
                                        {data &&
                                            data.isFetch &&
                                            data.products &&
                                            data.products[`page-${page}`] &&
                                            data.products[`page-${page}`].map((item, index) => {
                                                return (
                                                    <Grid item xs={3} key={index}>
                                                        <Card product={item} />
                                                    </Grid>
                                                )
                                            })}
                                    </Grid>

                                    {data.countPage > 1 && (
                                        <Stack alignItems="center" justifyContent="center" marginTop={5}>
                                            <PaginationCustomize
                                                page={page}
                                                setPage={setPage}
                                                countProducts={data.countProducts}
                                                limit={data.limit}
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

const Wrapper = styled(Box)(() => ({
    minHeight: "500px",

    ".box": {
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
        paddingBottom: "16px",

        ".list": {
            maxHeight: "300px",
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

const SortBy = styled(Box)(() => ({
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
