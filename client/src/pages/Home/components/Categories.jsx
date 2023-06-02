import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined"
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined"
import { Box, Container, Stack, Typography } from "@mui/material"
import { selectorCategories } from "~/redux/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { requestGetCategories } from "~/api"
import { NextArrow } from "~/styles/slider"
import { PrevArrow } from "~/styles/slider"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"

const offers = [
    {
        id: 1,
        name: "Miễn phí vận chuyển",
        value: "Đối với tất cả các đơn hàng trên 500.000",
        icon: <LocalShippingOutlinedIcon />,
    },
    {
        id: 2,
        name: "Ưu đãi bất ngờ mỗi ngày",
        value: "Tiết kiệm lên đến 25%",
        icon: <CardGiftcardOutlinedIcon />,
    },
    {
        id: 3,
        name: "Hỗ trợ 24/7",
        value: "Mua sắm cùng với chuyên gia",
        icon: <SupportAgentOutlinedIcon />,
    },
    {
        id: 4,
        name: "Giá cả phải chăng",
        value: "Lấy giá trực tiếp tại NSX",
        icon: <PercentOutlinedIcon />,
    },
    {
        id: 5,
        name: "Thanh toán an toàn",
        value: "100% thanh toán an toàn",
        icon: <PaymentOutlinedIcon />,
    },
]

const Categories = () => {
    const category = useSelector(selectorCategories)
    const dispatch = useDispatch()

    useEffect(() => {
        if (category.isFetch) return
        requestGetCategories(dispatch)
    }, [dispatch, category])

    return (
        <Box
            sx={{
                ".bg-color": {
                    backgroundColor: "var(--home-bg-second)",
                    padding: "50px 0",
                },
            }}
        >
            <Box className="bg-color">
                <Container maxWidth="lg" disableGutters>
                    <Box className="info">
                        <Stack alignItems="center" className="item">
                            <Stack alignItems="center" flexDirection="row">
                                {offers.map((item) => (
                                    <Stack alignItems="center" flexDirection="row" key={item.id}>
                                        <Stack
                                            alignItems="center"
                                            justifyContent="center"
                                            sx={{
                                                width: "80px",
                                                height: "80px",
                                                svg: {
                                                    fontSize: "2.2rem",
                                                },
                                            }}
                                        >
                                            {item.icon}
                                        </Stack>
                                        <Stack>
                                            <Typography
                                                sx={{
                                                    fontWeight: 500,
                                                    fontSize: ".9rem",
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: ".8rem",
                                                    color: "#666",
                                                }}
                                            >
                                                {item.value}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            padding: 2,
                            borderRadius: 3,
                            marginTop: 4,
                            marginBottom: 4,
                            boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.125)",

                            // custom divider
                            ".slick-current > div:first-child": {
                                "& > div": {
                                    borderRight: "1px solid #eee",
                                    borderBottom: "1px solid #eee",
                                },

                                "& > div:last-child": {
                                    borderRight: "1px solid #fff",
                                },
                            },

                            ".slick-current > div:last-child": {
                                "& > div": {
                                    borderRight: "1px solid #eee",
                                },

                                "& > div:last-child": {
                                    borderRight: "1px solid #fff",
                                },
                            },
                        }}
                    >
                        <Slider
                            dots={false}
                            infinite={true}
                            speed={500}
                            slidesToScroll={1}
                            slidesToShow={1}
                            rows={2}
                            slidesPerRow={5}
                            nextArrow={<NextArrow />}
                            prevArrow={<PrevArrow />}
                            className="custom-slider"
                        >
                            {category &&
                                category.categories &&
                                category.categories.length &&
                                category.categories.map((item, index) => {
                                    return (
                                        <Box key={index}>
                                            <Link to={item.accessLink} className="link">
                                                <Stack
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                    padding={2}
                                                    sx={{
                                                        ":hover": {
                                                            span: {
                                                                color: "var(--color-main)",
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {/* col right image */}
                                                    <Stack width="65px">
                                                        <img src={item.image} alt="" width="100%" />
                                                    </Stack>

                                                    {/* col left */}
                                                    <Stack
                                                        flexDirection="column"
                                                        alignItems="center"
                                                        justifyContent="start"
                                                        flexGrow={1}
                                                        lineHeight="30px"
                                                        paddingLeft={2}
                                                    >
                                                        {/* Name category */}
                                                        <Stack fontSize="16px" fontWeight={500} width="100%">
                                                            {item.categoryName}
                                                        </Stack>

                                                        {/* Count */}
                                                        <Stack
                                                            flexDirection="row"
                                                            alignItems="center"
                                                            justifyContent="space-between"
                                                            fontSize={14}
                                                            fontWeight={400}
                                                            color="#aaa"
                                                            width="100%"
                                                        >
                                                            <span>{item.count_product || 0} sản phẩm</span>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Link>
                                        </Box>
                                    )
                                })}
                        </Slider>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default Categories
