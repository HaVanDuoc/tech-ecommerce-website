import React from "react"
import Nav from "../Nav"
import AppBar from "./components/AppBar"
import { Box, styled } from "@mui/material"

const Header = () => {
    return (
        <Wrapper>
            <AppBar />
            <Nav />
        </Wrapper>
    )
}

export default Header

const Wrapper = styled(Box)(() => ({
    backgroundColor: "#fff",
    boxShadow: "1px 1px 3px 1px rgba(0, 0, 0, 0.25)",
    position: "relative",
    zIndex: 99,
}))
