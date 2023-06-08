import { Box, Container } from "@mui/material"
import React from "react"
import Slider from "react-slick"
import { NextArrow, PrevArrow } from "~/styles/slider"
import { PF } from "~/utils/__variables"

const Banner = () => {
    return (
        <Box sx={styles1}>
            <Box sx={styles2}>
                <img
                    src={PF + "/assets/banner/Banner-Bighero---Desk---Nen-1920x450.jpg"}
                    alt=""
                    style={{ width: "100%" }}
                />
            </Box>

            <Box className="mainBanner" sx={styles3}>
                <Container disableGutters>
                    <Slider {...settings} className="custom-slider slider-banner">
                        {dummyData.map((item, index) => (
                            <Box key={index}>
                                <Box>
                                    <img
                                        src={PF + "/assets/banner/" + item.src}
                                        alt=""
                                        width="100%"
                                        style={{ borderRadius: "15px" }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Container>
            </Box>
        </Box>
    )
}

export default Banner

const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 300,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
}

const dummyData = [
    { link: "", src: "720-220-720x220-17.png" },
    { link: "", src: "720x220-720x220-14.png" },
    { link: "", src: "720-220-720x220-71.png" },
    { link: "", src: "720-220-720x220-71.jpg" },
    { link: "", src: "720-220-720x220-17.png" },
]

const styles1 = {
    position: "relative",
    backgroundColor: "#fff",
    height: "460px",

    ".slick-slider": {
        ".next-arrow": {
            transform: "translateX(50%)",
        },
        ".prev-arrow": {
            transform: "translateX(-50%)",
        },
    },
}

const styles2 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "0 auto",
    overflow: "hidden",
}

const styles3 = {
    position: "absolute",
    left: "50%",
    bottom: "0px",
    transform: "translateX(-50%)",
}
