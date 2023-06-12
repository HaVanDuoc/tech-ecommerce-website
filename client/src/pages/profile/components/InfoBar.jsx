import { Avatar, Box, Container, Stack, Typography } from "@mui/material"
import { FormatFullName, formatVND } from "~/helper/format"
import { PF } from "~/utils/__variables"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectorCurrentUser } from "~/redux/authSlice"

const InfoBar = () => {
    const currentUser = useSelector(selectorCurrentUser)

    const countPayment = currentUser?.user?.sumPayment
    const avatar = currentUser?.user?.avatar
    const firstName = currentUser?.user?.firstName
    const middleName = currentUser?.user?.middleName
    const lastName = currentUser?.user?.lastName

    return (
        <Box sx={style1}>
            <Container maxWidth="lg" disableGutters>
                <Box sx={style2}>
                    <Box sx={{ position: "relative", height: 60, marginRight: 1 }}>
                        <Box sx={{ position: "relative", top: "-100px" }}>
                            <Avatar src={avatar} sx={{ width: 120, height: 120 }} />
                            <Avatar src={PF + "/assets/profile/cover-avatar.png"} sx={style3} />
                        </Box>
                    </Box>

                    <Stack sx={{ transform: "translateY(-60px)", marginLeft: 1 }}>
                        <Box sx={{ height: 60, display: "flex", alignItems: "center" }}>
                            <Typography fontSize={20} color="#fff">
                                {FormatFullName(firstName, middleName, lastName)}
                            </Typography>
                        </Box>

                        <Stack sx={style4}>
                            <CounterPayment countPayment={countPayment} />

                            <CounterFollower />

                            <CounterFollowing />

                            <CounterComment />

                            <CounterTimeLike />
                        </Stack>
                    </Stack>

                    <ButtonEdit />
                </Box>
            </Container>
        </Box>
    )
}

export default InfoBar

const ButtonEdit = () => {
    return (
        <Box sx={style5}>
            <Box className="edit" sx={style6}>
                <Typography fontSize={14} textTransform="capitalize">
                    Chỉnh sửa
                </Typography>
                <ArrowDropDownIcon />
            </Box>

            <Box className="option" sx={style7}>
                <Link to="/profile/edit">
                    <Box sx={style8}>
                        <Typography fontSize={14} color="#333">
                            Hoàn thiện thông tin cá nhân
                        </Typography>
                    </Box>
                </Link>
            </Box>
        </Box>
    )
}

const CounterTimeLike = () => {
    return (
        <Box className="item">
            <Typography variant="span" className="value">
                257
            </Typography>{" "}
            <Typography variant="span" textTransform="capitalize" className="name">
                Được thích
            </Typography>
        </Box>
    )
}

const CounterComment = () => {
    return (
        <Box className="item">
            <Typography variant="span" className="value">
                56
            </Typography>{" "}
            <Typography variant="span" textTransform="capitalize" className="name">
                Đánh giá
            </Typography>
            <Typography variant="span" margin="0 10px" className="divider">
                /
            </Typography>
        </Box>
    )
}

const CounterFollowing = () => {
    return (
        <Box className="item">
            <Typography variant="span" className="value">
                8
            </Typography>{" "}
            <Typography variant="span" textTransform="capitalize" className="name">
                Đang theo dõi
            </Typography>
            <Typography variant="span" margin="0 10px" className="divider">
                /
            </Typography>
        </Box>
    )
}

const CounterFollower = () => {
    return (
        <Box className="item">
            <Typography variant="span" className="value">
                30
            </Typography>{" "}
            <Typography variant="span" textTransform="capitalize" className="name">
                Người theo dõi
            </Typography>
            <Typography variant="span" margin="0 10px" className="divider">
                /
            </Typography>
        </Box>
    )
}

const CounterPayment = ({ countPayment }) => {
    return (
        <Box className="item">
            <Typography variant="span" className="value">
                {formatVND(countPayment)}
            </Typography>{" "}
            <Typography variant="span" textTransform="capitalize" className="name">
                Đã thanh toán
            </Typography>
            <Typography variant="span" margin="0 10px" className="divider">
                /
            </Typography>
        </Box>
    )
}

const style1 = {
    boxShadow: "0 0 5px 1px rgba(0,0,0,0.25)",
    position: "relative",
    height: "60px",
    backgroundColor: "#fff",
}

const style2 = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
}

const style3 = {
    width: 140,
    height: 140,
    position: "absolute",
    top: -10,
    left: -10,
}

const style4 = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",

    ".item": {
        ".value": {
            fontWeight: 500,
            fontSize: 18,
        },

        ".name": {
            color: "#666",
            fontSize: 14,
        },

        ".divider": {
            color: "#ddd",
        },
    },
}

const style5 = {
    position: "absolute",
    right: 0,
    top: -40,
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
    flexDirection: "column",
    transition: "all .3s ease",

    ":hover": {
        ".edit": {
            backgroundColor: "#6d86ea",
            color: "#fff",
        },
        ".option": {
            display: "block",
        },
    },
}

const style6 = {
    width: 130,
    backgroundColor: "#e1e7ff",
    padding: "3px 20px",
    borderRadius: "15px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
}

const style7 = {
    display: "none",
    backgroundColor: "#fff",
    padding: "15px 8px",
    marginTop: 1,
    borderRadius: 1,
    boxShadow: "0 0 1px 1px rgba(0,0,0,0.25)",
}

const style8 = {
    padding: "3px 10px",
    ":hover": {
        backgroundColor: "#eee",
        borderRadius: 1,
        cursor: "pointer",
        transition: "all .3s ease",

        "& p": {
            color: "#6d89fa",
        },
    },
}
