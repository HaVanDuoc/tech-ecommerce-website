import { useEffect, useState } from "react"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { Box, Container, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import AccountMenu from "~/components/Header/components/AccountMenu"

const HeaderProfile = () => {
    const [nav, setNav] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", changeHeader)
        return () => window.addEventListener("scroll", changeHeader)
    }, [])

    const changeHeader = () => {
        window.scrollY >= 300 ? setNav(true) : setNav(false)
    }

    return (
        <Box
            onScroll={changeHeader}
            sx={{
                position: "fixed",
                top: 0,
                display: "flex",
                width: "100%",
                color: "#fff",
                zIndex: 99,
                padding: 2,
                backgroundColor: `${nav && "#fff"}`,
                boxShadow: `${nav && "0 0 1px 1px rgba(0, 0, 0, 0.25)"}`,
            }}
        >
            <Container maxWidth="xl">
                <Stack flexDirection="row" alignItems="center" justifyContent="space-between" lineHeight={5}>
                    <Brand nav={nav} />

                    <Search nav={nav} />

                    <ItemsRight nav={nav} />
                </Stack>
            </Container>
        </Box>
    )
}

export default HeaderProfile

const Brand = ({ nav }) => {
    return (
        <Stack flexDirection="row" alignItems="center" justifyContent="center">
            <Typography
                color={nav && "var(--color-main)"}
                fontSize={30}
                fontWeight={600}
                marginRight={3}
                sx={{ cursor: "pointer" }}
            >
                Tech
            </Typography>

            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                    ".nav": {
                        color: `${nav ? "#888" : "#fff"}`,
                        margin: 1,
                        cursor: "pointer",
                        position: "relative",

                        "&:after": {
                            content: `""`,
                            backgroundColor: `${nav ? "var(--color-main)" : "#fff"}`,
                            height: "5px",
                            width: "20px",
                            borderRadius: "2.5px",
                            position: "absolute",
                            bottom: "-20%",
                            left: "50%",
                            transform: "translate(-50%, 20%)",
                            zIndex: -1,
                            display: "none",
                        },

                        ":hover": {
                            color: `${nav ? "var(--color-main)" : "#fff"}`,

                            ":after": {
                                display: "block",
                            },
                        },
                    },
                }}
            >
                <Link to="/" className="link">
                    <Typography fontWeight={600} textTransform="capitalize" className="nav">
                        Trang chủ
                    </Typography>
                </Link>
                <Typography fontWeight={600} textTransform="capitalize" className="nav">
                    Diễn đàn
                </Typography>
            </Stack>
        </Stack>
    )
}

const Search = ({ nav }) => {
    return (
        <Box
            className="header_profile"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                background: `${nav ? "rgb(247 247 247 / 85%)" : "rgba(0, 0, 0, 0.4)"}`,
                width: "480px",
                borderRadius: "20px",
                overflow: "hidden",
                border: `${nav ? "1px solid rgba(255, 255, 255, 0.85)" : "1px solid rgba(0, 0, 0, 0.4)"}`,
                boxShadow: `${nav ? "0 0 1px 1px rgba(0,0,0,0.1)" : "none"}`,
                transition: "all .3s ease",

                ":hover": {
                    border: `${nav ? "1px solid var(--color-main)" : "1px solid rgba(255, 255, 255, 0.85)"}`,
                },

                "& input": {
                    flex: 1,
                    height: "35px",
                    border: "none",
                    backgroundColor: "transparent",
                    padding: "0 50px 0 15px",
                    color: `${nav ? "#666" : "rgba(255, 255, 255, 0.85)"}`,

                    "::placeholder": {
                        color: `${nav ? "#666" : "rgba(255, 255, 255, 0.85)"}`,
                    },
                },

                ".icon": {
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: `${nav ? "#666" : "rgba(255, 255, 255, 0.85)"}`,
                },
            }}
        >
            <input placeholder="Bạn đang tìm gì?" />
            <Box className="icon">
                <SearchOutlinedIcon fontSize="small" />
            </Box>
        </Box>
    )
}

const ItemsRight = ({ nav }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",

                ".item": {
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",

                    "& a": {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    },

                    "& svg": {
                        color: `${nav && "#666"}`,
                    },
                },
            }}
        >
            <Stack flexDirection="row" justifyContent="center" alignItems="center">
                <Box className="item">
                    <Link to="/cart" className="link">
                        <ShoppingBasketOutlinedIcon />
                    </Link>
                </Box>
                <Box className="item">
                    <NotificationsNoneOutlinedIcon />
                </Box>
                <Box>
                    <AccountMenu />
                </Box>
            </Stack>
        </Box>
    )
}
