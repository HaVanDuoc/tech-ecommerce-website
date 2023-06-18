import { Box, Container, Stack } from "@mui/material"
import React from "react"
import { useParams } from "react-router-dom"
import Slider from "react-slick"
import { NextArrow, PrevArrow } from "~/styles/slider"
import { PF } from "~/utils/__variables"

const Banner = () => {
    let array = null
    const page = useParams().category
    let category = page

    const dienThoai = [
        { img: "-1.png", right: true },
        { img: "0.png", right: true },
        { img: "1.png" },
        { img: "2.png" },
        { img: "3.png" },
        { img: "4.png" },
        { img: "5.png" },
        { img: "6.png" },
    ]

    const tablet = [
        { img: "-1.png", right: true },
        { img: "0.png", right: true },
        { img: "1.png" },
        { img: "2.png" },
        { img: "3.png" },
        { img: "4.png" },
        { img: "5.png" },
        { img: "6.png" },
    ]

    const laptop = [
        { img: "-1.png", right: true },
        { img: "0.png", right: true },
        { img: "1.png" },
        { img: "2.png" },
        { img: "3.png" },
        { img: "4.png" },
        { img: "5.png" },
        { img: "6.png" },
        { img: "7.png" },
        { img: "8.png" },
        { img: "9.png" },
        { img: "10.png" },
    ]

    const taiNghe = [
        { img: "-1.png", right: true },
        { img: "0.png", right: true },
        { img: "1.png" },
        { img: "2.png" },
        { img: "3.png" },
        { img: "4.png" },
        { img: "5.png" },
        { img: "6.png" },
        { img: "7.png" },
        { img: "8.png" },
    ]

    switch (page) {
        case "dien-thoai":
            array = dienThoai
            break

        case "may-tinh-bang":
            array = tablet
            break

        case "laptop":
            array = laptop
            break

        case "tai-nghe":
            array = taiNghe
            break

        case "dong-ho":
            array = dienThoai
            category = "dien-thoai"
            break

        case "pc":
            array = dienThoai
            category = "dien-thoai"
            break

        case "sim":
            array = dienThoai
            category = "dien-thoai"
            break

        case "may-giat":
            array = dienThoai
            category = "dien-thoai"
            break

        case "tivi":
            array = dienThoai
            category = "dien-thoai"
            break

        case "tu-lanh":
            array = dienThoai
            category = "dien-thoai"
            break

        case "loa":
            array = dienThoai
            category = "dien-thoai"
            break

        case "quat-dieu-hoa":
            array = dienThoai
            category = "dien-thoai"
            break

        default:
            break
    }

    return (
        <Box
            sx={{
                padding: "10px 0",

                ".banner": {
                    minHeight: "250px",

                    ".prev-arrow": {
                        opacity: 1,
                        borderRadius: "50%",
                        padding: "10px",
                        transform: "translateX(-50%) !important",
                    },

                    ".next-arrow": {
                        opacity: 1,
                        borderRadius: "50%",
                        padding: "10px",
                        transform: "translateX(50%) !important",
                    },
                },
            }}
        >
            <Container maxWidth="lg" disableGutters>
                <Stack flexDirection="row" alignItems="center">
                    <Box width="66%">
                        <Slider
                            dots={false}
                            infinite={true}
                            speed={500}
                            slidesToShow={1}
                            slidesPerRow={1}
                            autoplay
                            autoplaySpeed={5000}
                            cssEase="linear"
                            nextArrow={<NextArrow />}
                            prevArrow={<PrevArrow />}
                            className="custom-slider banner"
                        >
                            {array &&
                                array
                                    .filter((array) => !array.right)
                                    .map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                width: "100%",
                                            }}
                                        >
                                            <img
                                                src={`${PF}/assets/product-details/${category}/${item.img}`}
                                                alt=""
                                                width="100%"
                                            />
                                        </Box>
                                    ))}
                        </Slider>
                    </Box>

                    <Stack flexDirection="column" alignItems="center" justifyContent="center" width="35%">
                        <Box>
                            {array &&
                                array
                                    .filter((array) => array.right)
                                    .map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                width: "100%",
                                            }}
                                        >
                                            <img
                                                src={`${PF}/assets/product-details/${category}/${item.img}`}
                                                alt=""
                                                width="100%"
                                            />
                                        </Box>
                                    ))}
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

export default Banner
