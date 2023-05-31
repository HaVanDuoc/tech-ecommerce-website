import {
    Badge,
    Box,
    Button,
    Container,
    Divider,
    Popover,
    Stack,
    styled,
    Typography,
} from "@mui/material"
import { Link } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import React from "react"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
import AccountMenu from "./AccountMenu"
import Notification from "./Notification"
import Cart from "./Cart"
import Search from "~/components/Search"
import Nav from "./components/Nav"

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

export const AppBar = () => {
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
                        <Stack
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {/* Button Home */}
                            <Link to="/">
                                <Button
                                    focusVisible
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--color-main) !important",
                                    }}
                                >
                                    <HomeIcon />
                                    <Typography sx={{ textTransform: "none" }}>
                                        Trang chủ
                                    </Typography>
                                </Button>
                            </Link>

                            <Notification />

                            <Cart />

                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                sx={{
                                    mx: 1,
                                    borderWidth: "1px",
                                    borderColor: "#ccc",
                                }}
                            />

                            {/* User */}
                            <AccountMenu />

                            {/*  */}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Container>
    )
}

export const Alert = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (e) => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    const NoAlert = () => (
        <Box
            position="relative"
            sx={{
                margin: "50px 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <SentimentSatisfiedAltIcon fontSize="large" color="primary" />
            <Typography sx={{ p: 1, fontWeight: "500" }}>
                Không có thông báo nào!
            </Typography>
        </Box>
    )

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: "0 4px",
        },
    }))

    return (
        <Box sx={{ color: "var(--color-main)" }}>
            <Button
                type="button"
                onClick={handleClick}
                sx={
                    open
                        ? { color: "var(--color-main)" }
                        : { color: "var(--color-secondary)" }
                }
            >
                <StyledBadge badgeContent={0} color="error">
                    <NotificationsActiveIcon />
                </StyledBadge>
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{ marginTop: "5px" }}
            >
                <NoAlert />
            </Popover>
        </Box>
    )
}

export const Brand = () => {
    return (
        <Box>
            <Link to="/">
                <Typography
                    sx={{
                        fontSize: "2em",
                        color: "var(--color-main)",
                        cursor: "pointer",
                    }}
                >
                    Tech
                </Typography>
            </Link>
        </Box>
    )
}
