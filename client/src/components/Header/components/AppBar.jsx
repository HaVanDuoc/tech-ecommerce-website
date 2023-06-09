import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material"
import Search from "~/components/Search"
import { Link } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import Notification from "./Notification"
import Cart from "./Cart"
import AccountMenu from "./AccountMenu"
import Brand from "./Brand"

const AppBar = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ padding: "24px 0" }}>
                <Stack flexDirection="row" alignItems="center" padding={0.5}>
                    <Box>
                        <Brand />
                    </Box>

                    <Box flex={1}>
                        <Search />
                    </Box>

                    <Box>
                        <Stack flexDirection="row" alignItems="center" justifyContent="center">
                            <Link to="/">
                                <Button focusVisible sx={style1}>
                                    <HomeIcon />
                                    <Typography sx={{ textTransform: "none" }}>Trang chủ</Typography>
                                </Button>
                            </Link>

                            <Notification />

                            <Cart />

                            <Divider orientation="vertical" variant="middle" flexItem sx={style2} />

                            <AccountMenu />
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Container>
    )
}

export default AppBar

const style1 = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-main) !important",
}

const style2 = {
    mx: 1,
    borderWidth: "1px",
    borderColor: "#ccc",
}
