import { Box, CircularProgress, Container, Stack, Typography, styled } from "@mui/material"
import React, { Fragment, useEffect } from "react"
import { formatCost, formatPrice, formatVND } from "~/helper/format"
import dayjs from "dayjs"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { useDispatch, useSelector } from "react-redux"
import { PF } from "~/utils/__variables"
import Tabs from "./Tabs"
import { refetch, selectorOrders } from "~/redux/orderSlice"
import { requestDestroyOrder, requestOrders } from "~/api"
import PaginationCustomize from "~/components/Pagination"
import { setPositionWindow } from "~/utils/calculate"
import { selectorCurrentUser } from "~/redux/authSlice"

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
                                                <OrderAt createdAt={createdAt} status={status} />{" "}
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

                                            {status === "Chờ xác nhận" || status === "Đã hủy" ? (
                                                <BtnAction id={id} status={status} />
                                            ) : (
                                                status === "Đã giao" && <BtnRating />
                                            )}
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

const OrderAt = ({ createdAt, status }) => {
    return (
        <Box sx={style2}>
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
