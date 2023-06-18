import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined"
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined"
import { Box, Container, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { requestCategories } from "~/api"
import { NextArrow } from "~/styles/slider"
import { PrevArrow } from "~/styles/slider"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import { selectorCategories } from "~/redux/categorySlice"

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
    const category = useSelector(selectorCategories)?.payload
    const dispatch = useDispatch()

    useEffect(() => {
        if (!category) requestCategories(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box sx={style1}>
            <Box className="bg-color">
                <Container maxWidth="lg" disableGutters>
                    <Box className="info">
                        <Stack alignItems="center" className="item">
                            <Stack alignItems="center" flexDirection="row">
                                {offers.map((item) => (
                                    <Stack alignItems="center" flexDirection="row" key={item.id}>
                                        <Stack sx={style2}>{item.icon}</Stack>
                                        <Stack>
                                            <Typography sx={style3}>{item.name}</Typography>
                                            <Typography sx={style4}>{item.value}</Typography>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Box>

                    <Box sx={style5}>
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
                                category.map((item, index) => {
                                    const alias = item.alias
                                    const image = item.image[0].path
                                    const name = item.name
                                    const sumProducts = item.sumProducts

                                    return (
                                        <Box key={index}>
                                            <Link to={`/${alias}`} className="link">
                                                <Stack padding={2} sx={style6}>
                                                    <Stack width="65px">
                                                        <img src={image} alt="" width="100%" />
                                                    </Stack>

                                                    <Stack
                                                        flexDirection="column"
                                                        alignItems="center"
                                                        justifyContent="start"
                                                        flexGrow={1}
                                                        lineHeight="30px"
                                                        paddingLeft={2}
                                                    >
                                                        <Stack fontSize="16px" fontWeight={500} width="100%">
                                                            {name}
                                                        </Stack>

                                                        <Stack
                                                            flexDirection="row"
                                                            alignItems="center"
                                                            justifyContent="space-between"
                                                            fontSize={14}
                                                            fontWeight={400}
                                                            color="#aaa"
                                                            width="100%"
                                                        >
                                                            <span>{sumProducts || 0} sản phẩm</span>
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

const style1 = {
    ".bg-color": {
        backgroundColor: "var(--home-bg-second)",
        padding: "50px 0",
    },
}

const style2 = {
    alignItems: "center",
    justifyContent: "center",
    width: "80px",
    height: "80px",
    svg: {
        fontSize: "2.2rem",
    },
}

const style3 = {
    fontWeight: 500,
    fontSize: ".9rem",
}

const style4 = {
    fontSize: ".8rem",
    color: "#666",
}

const style5 = {
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
}

const style6 = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    ":hover": {
        span: {
            color: "var(--color-main)",
        },
    },
}

export default Categories
