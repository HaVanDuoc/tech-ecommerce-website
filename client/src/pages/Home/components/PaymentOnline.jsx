import { Box, Container, styled } from "@mui/material"
import React from "react"
import Title from "./Title"
import Slider from "react-slick"
import { NextArrow, PrevArrow } from "~/styles/slider"
import { PF } from "~/utils/__variables"

const PaymentOnline = () => {
    return (
        <Box>
            <Container maxWidth="lg" disableGutters>
                <Title>Thanh toán online</Title>

                <Box>
                    <Slider
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToScroll={3}
                        slidesToShow={3}
                        autoplay={true}
                        autoplaySpeed={5000}
                        cssEase={"linear"}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                        className="custom-slider"
                    >
                        {dummyPayment.map((item, index) => {
                            return (
                                <Item key={index}>
                                    <img
                                        src={PF + "/assets/payment-online/" + item.img}
                                        alt=""
                                        width="100%"
                                        style={{
                                            borderRadius: "15px",
                                            overflow: "hidden",
                                        }}
                                    />
                                </Item>
                            )
                        })}
                    </Slider>
                </Box>
            </Container>
        </Box>
    )
}

export default PaymentOnline

const Item = styled(Box)(() => ({
    borderRadius: "15px",
    overflow: "hidden",
}))

const dummyPayment = [
    { id: 1, img: "1.png" },
    { id: 2, img: "2.png" },
    { id: 3, img: "3.png" },
    { id: 4, img: "4.png" },
]
