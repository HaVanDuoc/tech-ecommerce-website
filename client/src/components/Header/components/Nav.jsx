import { selectorCategories } from "~/redux/productSlice"
import { Box, Container, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { requestGetCategories } from "~/api"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import Slider from "react-slick"

const Nav = () => {
    const nav = useSelector(selectorCategories)
    const dispatch = useDispatch()

    useEffect(() => {
        if (nav.isFetch) return
        requestGetCategories(dispatch)
    }, [dispatch, nav])

    const Styled = styled(Box)(() => ({
        backgroundColor: "var(--color-main)",
        boxShadow: "2px 0 5px 5px rgba(0, 0, 0, 0.05)",

        ".slick-slider": {
            width: "100%",

            ":hover": {
                button: {
                    opacity: 1,
                },
            },
        },

        ".slick-slider button": {
            width: "20px",
            height: "20px",
            color: "#fff",
            opacity: 0,
            transition: "all .3s ease-in-out",
        },

        "button.slick-prev:before, button.slick-next:before": {
            fontSize: "20px",
        },

        ".slick-prev.slick-disabled:before, .slick-next.slick-disabled:before": {
            opacity: 0,
        },
    }))

    return (
        <Styled>
            <Container maxWidth="lg" disableGutters>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "50px",
                    }}
                >
                    <Slider dots={false} infinite={false} speed={500} slidesToShow={8} slidesToScroll={8}>
                        {nav.isFetch &&
                            Array.isArray(nav.categories) &&
                            nav.categories.map((item, index) => {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            paddingLeft: "10px",
                                            paddingRight: "10px",
                                        }}
                                    >
                                        <Link
                                            to={item.accessLink}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Typography
                                                display="flex"
                                                flexWrap="wrap"
                                                color="#fff"
                                                textTransform="uppercase"
                                                fontWeight={500}
                                                justifyContent="center"
                                            >
                                                {item.categoryName}
                                            </Typography>
                                        </Link>
                                    </Box>
                                )
                            })}
                    </Slider>
                </Box>
            </Container>
        </Styled>
    )
}

export default Nav
