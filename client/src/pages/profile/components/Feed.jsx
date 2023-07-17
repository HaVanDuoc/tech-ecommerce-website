import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
    Typography,
    styled,
} from "@mui/material"
import React, { Fragment, useEffect, useState } from "react"
import { formatCost, formatPrice, formatVND } from "~/helper/format"
import dayjs from "dayjs"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { useDispatch, useSelector } from "react-redux"
import { PF } from "~/utils/__variables"
import Tabs from "./Tabs"
import { refetch, refetchOrder, selectorOrders } from "~/redux/orderSlice"
import axiosInstance, { requestDestroyOrder, requestOrders } from "~/api"
import PaginationCustomize from "~/components/Pagination"
import { setPositionWindow } from "~/utils/calculate"
import { selectorCurrentUser } from "~/redux/authSlice"
import AtmIcon from "@mui/icons-material/Atm"
import WalletIcon from "@mui/icons-material/Wallet"
import AddIcon from "@mui/icons-material/Add"
import { exportResponse, setResponse } from "~/redux/alertSlice"

const Feed = () => {
    const orders = useSelector(selectorOrders)

    const tab = new URLSearchParams(window.location.search).get("tab")
    const page = Number(new URLSearchParams(window.location.search).get("page")) || 1
    const products = orders?.payload && orders.payload[`${tab}`] && orders.payload[`${tab}`][`page-${page}`]
    const sumPages = orders?.payload && orders.payload[`${tab}`] && orders.payload[`${tab}`]?.sumPages
    const user_id = useSelector(selectorCurrentUser)?.user?.id
    const dispatch = useDispatch()

    useEffect(() => {
        setPositionWindow(0, 200)
        requestOrders(dispatch, tab, page, user_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders.refetch])

    return (
        <Box sx={{ position: "relative", margin: 2 }}>
            <Container maxWidth="lg" disableGutters>
                <Box position="relative">
                    <Box position="sticky" top={82} sx={{ backgroundColor: "#f0f2f5", zIndex: 2 }}>
                        <Tabs />
                    </Box>

                    {products?.length ? <Search /> : <Fragment />}

                    {orders?.isPending ? (
                        <Loading />
                    ) : products?.length ? (
                        <OrderList>
                            {products.map((item, index) => {
                                const code = item?.code
                                const createdAt = item?.createdAt
                                const status = item?.status
                                const orderItem = item?.orderItem
                                const count = item?.orderItem?.length
                                const sumPay = item?.total
                                const id = item?.id
                                const isPay = item?.isPay

                                return (
                                    <OrderItem key={index}>
                                        <Box sx={style1}>
                                            <Stack
                                                flexDirection="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                marginBottom={2}
                                            >
                                                <Code code={code} />
                                                <OrderAt createdAt={createdAt} status={status} isPay={isPay} />{" "}
                                            </Stack>

                                            <Items orderItem={orderItem} />

                                            <Stack
                                                sx={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    borderTop: "1px solid #ddd",
                                                    borderBottom: "1px solid",
                                                    borderBottomColor: `${
                                                        status === "Chờ xác nhận" ||
                                                        status === "Đã hủy" ||
                                                        status === "Đã giao"
                                                            ? "#ddd"
                                                            : "#fff"
                                                    }`,
                                                    color: "#666",
                                                    fontSize: "14px",
                                                    lineHeight: "40px",
                                                }}
                                            >
                                                <CountProducts count={count} />
                                                <SumPayment sumPay={sumPay} />
                                            </Stack>

                                            <Stack flexDirection="row" alignItems="center" justifyContent="center">
                                                {status === "Chờ xác nhận" || status === "Đã hủy" ? (
                                                    <BtnAction id={id} status={status} />
                                                ) : (
                                                    status === "Đã giao" && <BtnRating />
                                                )}

                                                {(status === "Chờ xác nhận" ||
                                                    status === "Chờ lấy hàng" ||
                                                    status === "Đang giao") &&
                                                    isPay === 0 && <BtnPay id={id} />}
                                            </Stack>
                                        </Box>
                                    </OrderItem>
                                )
                            })}
                        </OrderList>
                    ) : (
                        <NoOrders />
                    )}
                </Box>

                <PaginationCustomize counterPage={sumPages} refetch={refetch()} />
            </Container>
        </Box>
    )
}

export default Feed

const BtnPay = ({ id }) => {
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [pending, setPending] = useState(false)
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickOpen2 = () => {
        setOpen2(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClose2 = () => {
        setOpen2(false)
    }

    const methods = [
        { name: "Ví TechPay", icon: <WalletIcon /> },
        { name: "Thẻ ngân hàng", icon: <AtmIcon /> },
    ]

    const handleClickMethod = (method) => {
        if (method === "Thẻ ngân hàng") {
            handleClickOpen2()
        }
        handleClose()
    }

    const atm = [
        { name: "atm", img: `${PF + "/assets/Visa_Inc._logo.svg.jpg"}` },
        { name: "master card", img: `${PF + "/assets/MasterCard_Logo.svg.png"}` },
        { name: "visa", img: `${PF + "/assets/Visa_Inc._logo.svg.jpg"}` },
        { name: "jcb", img: `${PF + "/assets/196559.png"}` },
    ]

    const handleClickPayment = () => {
        setPending(true)
        setTimeout(async () => {
            const response = await axiosInstance("post", "/order/payment", { id })
            setPending(false)
            if (response.data.err === 0) handleClose2()
            dispatch(setResponse(response))
            dispatch(exportResponse())
            dispatch(refetch())
        }, 1500)
    }

    return (
        <Stack justifyContent="center" alignItems="center">
            <Box
                onClick={handleClickOpen}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid",
                    borderColor: "#056dd2",
                    backgroundColor: "#056dd2",
                    color: "#fff",
                    margin: 1,
                    padding: "5px 50px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "all .3s ease",

                    ":hover": {
                        backgroundColor: "#0863bc",
                    },
                }}
            >
                Thanh toán
            </Box>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {methods.map((item) => (
                        <ListItem disableGutters onClick={() => handleClickMethod(item.name)}>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disableGutters>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon fontSize="small" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Thêm phương thức thanh toán" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Dialog>

            <Dialog onClose={handleClose2} open={open2}>
                <List sx={{ pt: 0, padding: 3 }}>
                    <Stack flexDirection="row" justifyContent="center" alignItems="center" padding="20px 10px 5px">
                        {atm.map((item, index) => {
                            return (
                                <Stack
                                    key={index}
                                    justifyContent="center"
                                    alignItems="center"
                                    height={40}
                                    sx={{
                                        border: "1px solid lightgrey",
                                        // my: 1,
                                        mx: 0.5,
                                        p: 1,
                                    }}
                                >
                                    <img src={item.img} alt="item.name" height="100%" />
                                </Stack>
                            )
                        })}
                    </Stack>

                    <TextField id="outlined-basic" fullWidth label="Số thẻ" variant="outlined" sx={{ mt: 3 }} />
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        label="Tên chủ thẻ (Không dấu)"
                        variant="outlined"
                        sx={{ my: 3 }}
                    />

                    <Stack flexDirection="row" alignItems="center" justifyContent="center">
                        {pending ? (
                            <Button variant="contained" fullWidth size="large">
                                <CircularProgress size={25} sx={{ color: "#fff" }} />
                            </Button>
                        ) : (
                            <Button variant="contained" fullWidth size="large" onClick={handleClickPayment}>
                                Thanh toán
                            </Button>
                        )}
                    </Stack>
                </List>
            </Dialog>
        </Stack>
    )
}

const BtnRating = () => {
    return (
        <Stack justifyContent="center" alignItems="center">
            <Box sx={style5}>Đánh giá</Box>
        </Stack>
    )
}

const BtnAction = ({ id, status }) => {
    const dispatch = useDispatch()

    const handleDestroyOrder = (order_details_id) => {
        requestDestroyOrder(dispatch, order_details_id)
    }

    return (
        <Stack justifyContent="center" alignItems="center">
            <Box
                onClick={() => handleDestroyOrder(id)}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid",
                    borderColor: `${status !== "Đã hủy" ? "#ccc" : "red"}`,
                    backgroundColor: `${status !== "Đã hủy" ? "#ccc" : "red"}`,
                    color: "#fff",
                    margin: 1,
                    padding: "5px 50px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "all .3s ease",

                    ":hover": {
                        backgroundColor: `${status !== "Đã hủy" ? "#aaa" : "#d40a0a"}`,
                    },
                }}
            >
                {status !== "Đã hủy" ? "Xác nhận hủy" : "Mua lại"}
            </Box>
        </Stack>
    )
}

const SumPayment = ({ sumPay }) => {
    return (
        <Box>
            <Typography variant="span">Tổng thanh toán: </Typography>{" "}
            <Typography variant="span" color="crimson" fontSize="16px" fontWeight={500}>
                {formatVND(sumPay)}
            </Typography>
        </Box>
    )
}

const CountProducts = ({ count }) => {
    return (
        <Box>
            <Typography variant="span">{count}</Typography> <Typography variant="span">sản phẩm</Typography>
        </Box>
    )
}

const Items = ({ orderItem }) => {
    return (
        <Box display="flex" flexWrap="wrap">
            {orderItem &&
                orderItem.map((item, index) => {
                    return (
                        <Stack key={index} flexDirection="row" sx={style3}>
                            <Box sx={style4}>
                                <img
                                    src={item.files ? item.files[0].path : ""}
                                    alt={item.files ? item.files[0].originalname : ""}
                                />
                            </Box>

                            <Stack flexDirection="column" marginLeft={2} sx={{ color: "#666" }}>
                                <Typography>{item.name_product}</Typography>
                                <Typography>{`x${item.quantity}`}</Typography>
                                <Stack flexDirection="row" justifyContent="start" alignItems="center">
                                    <Typography variant="span" marginRight={1}>
                                        {formatCost(item.price)}
                                    </Typography>
                                    <Typography variant="span" color="crimson" fontWeight={500}>
                                        {formatPrice(item.price, item.discount)}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    )
                })}
        </Box>
    )
}

const OrderAt = ({ createdAt, status, isPay }) => {
    return (
        <Box sx={style2}>
            {isPay === 1 && (
                <Typography
                    variant="span"
                    sx={{ mr: 1, backgroundColor: "#3cd53c", padding: "1px 8px", borderRadius: "45px" }}
                >
                    Đã thanh toán
                </Typography>
            )}
            <Typography variant="span">Đặt ngày</Typography>{" "}
            <Typography variant="span">{String(dayjs(createdAt).format("DD/MM/YYYY h:mm"))}</Typography>{" "}
            <Typography variant="span" color="crimson !important" fontWeight={500}>
                {status}
            </Typography>
        </Box>
    )
}

const Code = ({ code }) => {
    return (
        <Box>
            <Typography variant="span" color="#666" fontSize={14}>
                Đơn hàng
            </Typography>{" "}
            <Typography variant="span" sx={{ color: "dodgerblue", cursor: "pointer" }}>
                {code}
            </Typography>
        </Box>
    )
}

const Search = () => {
    return (
        <Box
            sx={{
                width: "100%",
                marginTop: 2,
                marginBottom: 2,
                backgroundColor: "#e7e7e7",

                ":hover": {
                    ".icon": {
                        "& svg": {
                            color: "inherit",
                        },
                    },
                },

                ".icon": {
                    width: 45,
                    height: 45,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    "& svg": {
                        color: "#666",
                    },
                },

                input: {
                    flex: 1,
                    border: "none",
                    backgroundColor: "transparent",
                    height: 45,
                    lineHeight: 20,
                    fontSize: 15,

                    "::placeholder": {
                        color: "#666",
                    },
                },
            }}
        >
            <Stack flexDirection="row" justifyContent="center" alignItems="center">
                <Box className="icon">
                    <SearchOutlinedIcon />
                </Box>
                <input type="text" placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản Phẩm" />
            </Stack>
        </Box>
    )
}

const Loading = () => {
    return (
        <Box
            sx={{
                minHeight: 500,
                backgroundColor: "#fff",
                marginTop: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",

                "& img": {
                    width: "150px",
                },
            }}
        >
            <CircularProgress />
            <Typography fontSize={18} fontWeight={500} color="#666">
                Đang xử lý...
            </Typography>
        </Box>
    )
}

const NoOrders = () => {
    return (
        <Box
            sx={{
                minHeight: 500,
                backgroundColor: "#fff",
                marginTop: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",

                "& img": {
                    width: "150px",
                },
            }}
        >
            <img src={PF + "/assets/profile/icon-no-order.png"} alt="" />
            <Typography fontSize={18} fontWeight={500} color="#666">
                Chưa có đơn hàng
            </Typography>
        </Box>
    )
}

const OrderList = styled(Box)(() => ({
    marginTop: 16,
}))

const OrderItem = styled(Box)(() => ({}))

const style1 = {
    backgroundColor: "#fff",
    padding: 2,
    marginTop: 2,
    marginBottom: 2,
    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.25)",
}

const style2 = {
    "& span": {
        color: "#666",
        fontSize: "14px",
    },
}

const style3 = {
    flex: 1,
    minWidth: "33%",
    marginTop: 2,
    marginBottom: 2,
}

const style4 = {
    border: "1px solid #ccc",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& img": {
        width: 70,
    },
}

const style5 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid",
    borderColor: "dodgerblue",
    backgroundColor: "dodgerblue",
    color: "#fff",
    margin: 1,
    padding: "5px 50px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all .3s ease",

    ":hover": {
        backgroundColor: "#0e71d2",
    },
}
