import React from "react"
import { Badge, Box, Button, Popover, Typography, styled } from "@mui/material"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"

const Alert = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (e) => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    return (
        <Box sx={{ color: "var(--color-main)" }}>
            <Button
                type="button"
                onClick={handleClick}
                sx={open ? { color: "var(--color-main)" } : { color: "var(--color-secondary)" }}
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

export default Alert

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
        <Typography sx={{ p: 1, fontWeight: "500" }}>Không có thông báo nào!</Typography>
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
