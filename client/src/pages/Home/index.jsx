import "./styles/fonts.css"
import "./styles/slider-banner.scss"
import { Box, styled } from "@mui/material"
import React from "react"
import Categories from "./components/Categories"
import LatestProduct from "./components/LatestProduct"
import SuggestProduct from "./components/SuggestProduct"
import Banner from "./components/Banner"
import PaymentOnline from "./components/PaymentOnline"
import Services from "./components/Services"
import SpecialBrand from "./components/SpecialBrand"
import News from "./components/News"

const Home = () => {
    return (
        <Wrapper>
            <Banner />

            <LatestProduct />

            <Categories />

            <Box sx={{ backgroundColor: "#fff", padding: "50px 0" }}>
                <PaymentOnline />
                <Services />
            </Box>

            <SpecialBrand />

            <News />

            <SuggestProduct />
        </Wrapper>
    )
}

export default Home

const Wrapper = styled(Box)(() => ({
    "--home-bg-second": "#f0f2f5",
    "--padding-section": "50px 0",
}))
