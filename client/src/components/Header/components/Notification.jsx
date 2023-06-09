import React from "react"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { news } from "~/pages/Home/components/News"

const Notification = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <Tooltip title="Thông báo">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <NotificationsNoneOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },

                    "& li:nth-child": {
                        borderBottom: "1px solid #ddd !important",
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {news.slice(0, 3).map((item, index) => {
                    return (
                        <MenuItem onClick={handleClose}>
                            <Box
                                sx={{
                                    width: 320,
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "start",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    padding: "15px 0",
                                }}
                            >
                                <Typography
                                    sx={{
                                        width: "100%",
                                        fontWeight: 500,
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        marginBottom: 1,
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="span"
                                    sx={{
                                        width: "100%",
                                        fontSize: "13px",
                                        color: "#666",
                                        display: "-webkit-box",
                                        "-webkit-line-clamp": "2",
                                        "-webkit-box-orient": "vertical",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                    }}
                                >
                                    {item.content}
                                </Typography>
                            </Box>
                        </MenuItem>
                    )
                })}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography fontSize="14px" color="dodgerblue" sx={{ cursor: "pointer" }}>
                        Tất cả
                    </Typography>
                </Box>
            </Menu>
        </React.Fragment>
    )
}

export default Notification
