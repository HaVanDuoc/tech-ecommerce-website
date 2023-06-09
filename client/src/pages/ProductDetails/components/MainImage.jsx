import { Box } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import Slider from "react-slick"
import { selectorProduct } from "~/redux/productSlice"

const MainImage = () => {
    const [nav1, setNav1] = useState()
    const [nav2, setNav2] = useState()

    const product = useSelector(selectorProduct)

    if (product?.data?.images) var images = product?.data?.images

    return (
        <Box position="relative" sx={styles1}>
            <Box sx={styles2}>
                <Box sx={styles3}>
                    <Slider
                        asNavFor={nav2}
                        ref={(slider1) => setNav1(slider1)}
                        arrows={false}
                        infinite={true}
                        className="main-slider"
                    >
                        {images &&
                            images.map((item, index) => {
                                return <img src={item.path} alt={item.originalname} key={index} />
                            })}
                    </Slider>
                </Box>
            </Box>

            <Box sx={styles4}>
                <Slider
                    arrows={false}
                    asNavFor={nav1}
                    ref={(slider2) => setNav2(slider2)}
                    slidesToShow={5}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    infinite={true}
                    autoplay={true}
                    autoplaySpeed={3000}
                    className="option-slider"
                >
                    {images &&
                        images.map((item, index) => {
                            return <img src={item.path} alt={item.originalname} key={index} />
                        })}
                </Slider>
            </Box>
        </Box>
    )
}

export default MainImage

const styles1 = {
    ".main-slider": {
        ".slick-slide > div": {
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
        },
    },

    ".option-slider": {
        ".slick-slide": {
            padding: "8px",
        },

        ".slick-slide > div": {
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
        },

        ".slick-current": {
            border: "3px solid dodgerblue",
        },

        "& img": {
            display: "flex !important",
            height: "80px",
        },
    },
}

const styles2 = {
    height: "480px",
    maxHeight: "480px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const styles3 = {
    width: "100%",
}

const styles4 = {
    transform: "translate(50%, 0)",
}
