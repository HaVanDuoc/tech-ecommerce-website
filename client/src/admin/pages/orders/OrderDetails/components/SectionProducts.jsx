import { Box, Checkbox, CircularProgress, Grid, Stack, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import React, { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import axiosInstance from "~/api"
import { formatCost, formatDiscount, formatPrice, formatVND } from "~/helper/format"
import { refetchOrder, selectorOrder } from "~/redux/orderSlice"
import { selectorAdminOrder, setPendingCount } from "~/redux/pageAdminOrderSlice"
import { calculatePayment } from "~/utils/calculate"

const SectionProducts = ({ order_list, order_status, payment, setPayment }) => {
    const order = useSelector(selectorOrder)
    const dispatch = useDispatch()
    const pendingCount = useSelector(selectorAdminOrder)?.isPendingCount

    const handleIncrease = (index) => {
        const order_detail_id = order.payload.order_list[index].order_detail_id
        const order_items_id = order.payload.order_list[index].order_items_id
        const price = order.payload.order_list[index].price
        const discount = order.payload.order_list[index].discount
        const quantity = 1
        const pay = calculatePayment(price, quantity, discount)

        dispatch(setPendingCount(true))
        setTimeout(async () => {
            await axiosInstance("post", "/order/orderDetails/increase", {
                order_items_id,
                pay,
                order_detail_id,
            })
            dispatch(setPendingCount(false))
            dispatch(refetchOrder())
        }, 700)
    }

    const handleDecrease = (index) => {
        const currentCount = document.querySelector(`.box-quantity-${index} .count`).innerHTML
        if (currentCount === "1") return

        const order_detail_id = order.payload.order_list[index].order_detail_id
        const order_items_id = order.payload.order_list[index].order_items_id
        const price = order.payload.order_list[index].price
        const discount = order.payload.order_list[index].discount
        const quantity = 1
        const pay = calculatePayment(price, quantity, discount)

        dispatch(setPendingCount(true))
        setTimeout(async () => {
            await axiosInstance("post", "/order/orderDetails/decrease", {
                order_items_id,
                pay,
                order_detail_id,
            })
            dispatch(setPendingCount(false))
            dispatch(refetchOrder())
        }, 700)
    }

    const handleDelete = (index) => {
        const deleteProduct = async () => {
            const order_detail_id = order.payload.order_list[index].order_detail_id
            const order_items_id = order.payload.order_list[index].order_items_id

            const response = await axiosInstance("delete", "/order/orderDetails/delete", {
                order_detail_id,
                order_items_id,
            })
            handleSnackBar(response)
            dispatch(refetchOrder())
        }

        deleteProduct()
    }

    const { enqueueSnackbar } = useSnackbar()

    const handleSnackBar = (res) => {
        if (res.data.err === 0) {
            enqueueSnackbar(res.data.msg, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 4000,
            })
        } else {
            enqueueSnackbar(res.data.msg, {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 4000,
            })
        }
    }

    return (
        <Box className="content">
            {order_list ? (
                order_list.map((item, index) => {
                    const id = item.id
                    const image = item.files[0].path
                    const nameImage = item.files[0].originalName
                    const category = item.category
                    const product = item.name_product
                    const discount = item?.discount
                    const price = item?.price
                    const quantity = item.quantity

                    return (
                        <Box className={`item col cart-item-${index}`} key={index}>
                            <Box className="col-0">
                                <Checkbox className={`box-select-${index}`} />

                                <Box sx={{ display: "none" }} className={`box-product-id-${index}`}>
                                    {id}
                                </Box>
                            </Box>

                            <Box className="col-1">
                                <Grid container spacing={1} flexDirection="row">
                                    <Grid item xs={4}>
                                        <img src={image} alt={nameImage} width="100%" />
                                    </Grid>
                                    <Grid item xs>
                                        <Box sx={style1}>
                                            <Typography>{`${category} ${product}`}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box className="col-2 field-bill">
                                {discount !== 0 ? (
                                    <Typography sx={style2}>
                                        <Typography variant="span" color="#666" fontSize="14px">
                                            {formatCost(price)}
                                        </Typography>
                                        <Typography variant="span" color="crimson" fontWeight={500} fontSize="14px">
                                            {formatDiscount(discount)}
                                        </Typography>
                                    </Typography>
                                ) : (
                                    <Fragment />
                                )}
                                <Typography>{formatPrice(price, discount)}</Typography>
                            </Box>

                            {order_status === "Chờ xác nhận" ? (
                                <Box className={`col-3 box-quantity-${index}`}>
                                    <Box sx={styles}>
                                        <Box className="btn" onClick={() => handleDecrease(index)}>
                                            -
                                        </Box>
                                        <Box className={`count get-quantity-${index}`}>{quantity}</Box>
                                        <Box className="btn" onClick={() => handleIncrease(index)}>
                                            +
                                        </Box>
                                    </Box>
                                </Box>
                            ) : (
                                <Box className={`col-3 count get-quantity-${index}`}>{quantity}</Box>
                            )}

                            <Box className="col-4">
                                <Typography className={`box-price-${index}`} sx={{ color: "crimson" }}>
                                    {pendingCount ? (
                                        <CircularProgress size={18} />
                                    ) : (
                                        formatVND(calculatePayment(price, quantity, discount))
                                    )}
                                </Typography>
                            </Box>

                            {order_status === "Chờ xác nhận" ? (
                                <Box className="col-5">
                                    <Typography
                                        sx={{ color: "crimson", cursor: "pointer" }}
                                        onClick={() => handleDelete(index)}
                                    >
                                        Xóa
                                    </Typography>
                                </Box>
                            ) : (
                                <Box className="col-5">
                                    <Typography sx={{ color: "crimson", cursor: "pointer" }}>...</Typography>
                                </Box>
                            )}
                        </Box>
                    )
                })
            ) : (
                <Stack justifyContent="center" alignItems="center" height={200}>
                    <CircularProgress />
                </Stack>
            )}
        </Box>
    )
}

export default SectionProducts

const style1 = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "100%",
}

const style2 = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    "span:nth-child(n)": {
        marginLeft: "5px",
    },
}

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: "40px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "120px",
    margin: "0 auto",

    ".btn": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        aspectRatio: "1/1",
        fontSize: "30px",
        cursor: "pointer",
        color: "#555",
    },

    ".count": {
        flex: 1,
        borderLeft: "1px solid #ccc",
        borderRight: "1px solid #ccc",
    },
}
