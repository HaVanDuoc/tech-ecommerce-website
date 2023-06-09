import React from "react"
import { Box, Stack, Container, Divider, styled, Typography } from "@mui/material"
import TopBar from "~/components/Header/components/TopBar"
import Search from "~/components/Search"
import AccountMenu from "~/components/Header/components/AccountMenu"
import Brand from "~/components/Header/components/Brand"

const HeaderCart = () => {
    return (
        <Box classNames="header-cart" sx={{ boxShadow: "0 1px 0 rgba(0, 0, 0, 0.125)" }}>
            <TopBar />

            <Bottom sx={{ backgroundColor: "#fff", padding: "30px 0" }}>
                <Container>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Stack flexDirection="row" justifyContent="center" alignItems="center">
                            <Brand />

                            <Divider orientation="vertical" variant="middle" flexItem sx={style1} />

                            <Typography sx={{ color: "var(--color-main)", fontSize: "24px" }}>Giỏ hàng</Typography>
                        </Stack>

                        <Search />

                        <AccountMenu />
                    </Stack>
                </Container>
            </Bottom>
        </Box>
    )
}

export default HeaderCart

const Bottom = styled(Box)(() => ({}))

const style1 = {
    margin: "auto 20px",
    height: "30px",
    borderWidth: "1px",
    borderColor: "var(--color-main)",
}
