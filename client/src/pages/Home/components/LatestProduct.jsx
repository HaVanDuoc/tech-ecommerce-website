import { Box, Container, Stack } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Slider from "react-slick"
import { requestGetProducts } from "~/api"
import Card from "~/components/card"
import SkeletonCard from "~/components/skeleton"
import { selectorLatestProducts } from "~/redux/productSlice"
import { NextArrow, PrevArrow } from "~/styles/slider"

const LatestProduct = ({ Title }) => {
    const latestProduct = useSelector(selectorLatestProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (latestProduct.isFetch) return

        const config = {
            limit: 20,
        }

        requestGetProducts(dispatch, config)
    }, [dispatch, latestProduct])

    return (
        <Box sx={{ backgroundColor: "#fff", padding: "40px 0" }}>
            <Container maxWidth="lg" disableGutters>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Title>Sản phẩm mới</Title>
                </Stack>

                {latestProduct.isFetch ? (
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
                            {latestProduct?.products?.list?.slice(0, 8)?.map((item, index) => {
                                return (
                                    <Box key={index}>
                                        <Card product={item} />
                                    </Box>
                                )
                            })}
                        </Slider>
                    </Box>
                ) : (
                    <Stack
                        flexDirection="row"
                        sx={{
                            padding: "16px 0",
                            "& > div": { marginRight: 2 },
                            "& > div:last-child": {
                                marginRight: 0,
                            },
                        }}
                    >
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