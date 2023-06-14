import { Box, Container, Stack } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Slider from "react-slick"
import { requestLatestProducts } from "~/api"
import Card from "~/components/Card"
import SkeletonCard from "~/components/skeleton"
import { selectorProducts } from "~/redux/productSlice"
import { NextArrow, PrevArrow } from "~/styles/slider"
import Title from "./Title"

const LatestProduct = () => {
    const dispatch = useDispatch()
    const latestProduct = useSelector(selectorProducts)?.home?.latest?.payload
    const more = new URLSearchParams(window.location.search).get("more") || 1

    useEffect(() => {
        if (latestProduct && latestProduct[`${more}`]) return
        const config = { limit: 20 }
        requestLatestProducts(dispatch, config)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box sx={{ backgroundColor: "#fff", padding: "40px 0" }}>
            <Container maxWidth="lg" disableGutters>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Title>Sản phẩm mới</Title>
                </Stack>

                {latestProduct[`${more}`] ? (
                    <Box sx={{ padding: "16px 0" }}>
                        <Slider
                            dots={false}
                            infinite={true}
                            speed="500"
                            slidesToShow={4}
                            slidesToScroll={4}
                            nextArrow={<NextArrow />}
                            prevArrow={<PrevArrow />}
                            className="custom-slider"
                        >
                            {latestProduct[`${more}`].slice(0, 8)?.map((item, index) => {
                                return (
                                    <Box key={index}>
                                        <Card product={item} />
                                    </Box>
                                )
                            })}
                        </Slider>
                    </Box>
                ) : (
                    <Stack flexDirection="row" sx={styles1}>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </Stack>
                )}
            </Container>
        </Box>
    )
}

export default LatestProduct

const styles1 = {
    padding: "16px 0",
    "& > div": { marginRight: 2 },
    "& > div:last-child": {
        marginRight: 0,
    },
}
