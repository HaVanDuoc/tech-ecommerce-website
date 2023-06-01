import { Box, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PF } from "~/utils/__variables"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { selectorCurrentUser } from "~/redux/authSlice"

const styles = {
    position: "fixed",
    right: "1vw",
    bottom: "3vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",

    "& svg": {
        color: "#777",
    },

    "& img": {
        width: 80,
    },

    "& p": {
        fontWeight: 500,
        color: "#777",
        textShadow: "1px 1px #777",
    },

    ":hover": {
        svg: {
            color: "dodgerblue",
            transition: "all .3s ease",
        },
    },
}

const GoToAdminPage = () => {
    // true - home page
    // false - admin page
    const [admin, setAdmin] = useState(false)
    const currentUser = useSelector(selectorCurrentUser)

    const pathname = window.location.pathname

    useEffect(() => {
        pathname.includes("/admin") ? setAdmin(true) : setAdmin(false)
    }, [pathname])

    return (
        currentUser.isLogged &&
        currentUser.user &&
        currentUser.user.data.role !== "Khách khàng" && (
            <Link to={admin ? "/" : "/admin"}>
                <Box sx={styles}>
                    {admin ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                    <img src={PF + "/assets/go-to-admin-page.gif"} alt="" />
                    {admin ? (
                        <Typography>Quay lại trang chủ</Typography>
                    ) : (
                        <Typography>Đến trang Admin</Typography>
                    )}
                </Box>
            </Link>
        )
    )
}

export default GoToAdminPage
