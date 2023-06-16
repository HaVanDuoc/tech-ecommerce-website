import { Box, Checkbox, CircularProgress, Grid, Stack, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import React, { Fragment } from "react"
import { formatCost, formatDiscount, formatPrice, formatVND } from "~/helper/format"
import axiosInstance from "~/utils/axiosInstance"

const SectionProducts = ({ order_list, order_status, payment, setPayment }) => {
    const handleIncrease = (index, price, discount, order_items_id) => {
        // get value current quantity
        const currentValue = document.querySelector(`.box-quantity-${index} .count`).innerHTML

        // Increase it by 1 then render
        document.querySelector(`.box-quantity-${index} .count`).innerHTML = Number(currentValue) + 1

        // and render price
        document.querySelector(`.box-price-${index}`).innerHTML = formatVND(
            (price - price * ((discount ? discount : 0) / 100)) * (Number(currentValue) + 1)
        )

        // set tổng tiền
        setPayment(Number(payment) + Number(price - price * ((discount ? discount : 0) / 100)))

        // update quantity
        const fetch = async () => {
            await axiosInstance({
                method: "post",
                url: "/admin/orders/orderDetails/increase",
                headers: { Authorization: localStorage.getItem("access_token") },
                data: { order_items_id },
            })
        }

        fetch()
    }

    const handleDecrease = (index, price, discount, order_items_id) => {
        // get value current quantity
        const currentValue = document.querySelector(`.box-quantity-${index} .count`).innerHTML

        // if value = 1 then stop
        if (currentValue === "1") return

        // Increase it by 1 then render
        document.querySelector(`.box-quantity-${index} .count`).innerHTML = Number(currentValue) - 1

        // and render price
        document.querySelector(`.box-price-${index}`).innerHTML = formatVND(
            (price - price * ((discount ? discount : 0) / 100)) * (Number(currentValue) - 1)
        )

        // set tổng tiền
        setPayment(Number(payment) - Number(price - price * ((discount ? discount : 0) / 100)))

        // update quantity
        const fetch = async () => {
            await axiosInstance({
                method: "post",
                url: "/admin/orders/orderDetails/decrease",
                headers: { Authorization: localStorage.getItem("access_token") },
                data: { order_items_id },
            })
        }

        fetch()
    }

    const handleDelete = (order_items_id, order_detail_id, product_id) => {
        // Request to server delete product
        const deleteProduct = async () => {
            const response = await axiosInstance({
                method: "post",
                url: "/admin/orders/orderDetails/delete",
                headers: { Authorization: localStorage.getItem("access_token") },
                data: {
                    order_detail_id,
                    order_items_id,
                    product_id,
                },
            })

            handleSnackBar(response)

            // setReset(!reset) // Refresh data
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
                    return (
                        <Box className={`item col cart-item-${index}`} key={index}>
                            <Box className="col-0">
                                <Checkbox className={`box-select-${index}`} />

                                <Box sx={{ display: "none" }} className={`box-product-id-${index}`}>
                                    {item.id}
                                </Box>
                            </Box>

                            <Box className="col-1">
                                <Grid container spacing={1} flexDirection="row">
                                    <Grid item xs={4}>
                                        <img src={item.files[0].path} alt={item.files[0].originalName} width="100%" />
                                    </Grid>
                                    <Grid item xs>
                                        <Box sx={style1}>
                                            <Typography>{`${item.category} ${item.name_product}`}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box className="col-2 field-bill">
                                {item?.discount !== 0 ? (
                                    <Typography sx={style2}>
                                        <Typography variant="span" color="#666" fontSize="14px">
                                            {formatCost(item.price)}
                                        </Typography>
                                        <Typography variant="span" color="crimson" fontWeight={500} fontSize="14px">
                                            {formatDiscount(item.discount)}
                                        </Typography>
                                    </Typography>
                                ) : (
                                    <Fragment />
                                )}
                                <Typography>{formatPrice(item.price, item.discount)}</Typography>
                            </Box>

                            {order_status === "Chờ xác nhận" ? (
                                <Box className={`col-3 box-quantity-${index}`}>
                                    <Box sx={styles}>
                                        <Box
                                            className="btn"
                                            onClick={() =>
                                                handleDecrease(index, item.price, item.discount, item.order_items_id)
                                            }
                                        >
                                            -
                                        </Box>
                                        <Box className={`count get-quantity-${index}`}>{item.quantity}</Box>
                                        <Box
                                            className="btn"
                                            onClick={() =>
                                                handleIncrease(index, item.price, item.discount, item.order_items_id)
                                            }
                                        >
                                            +
                                        </Box>
                                    </Box>
                                </Box>
                            ) : (
                                <Box className={`col-3 count get-quantity-${index}`}>{item.quantity}</Box>
                            )}

                            <Box className="col-4">
                                <Typography className={`box-price-${index}`} sx={{ color: "crimson" }}>
                                    {formatVND(
                                        (item.price - item.price * ((item.discount ? item.discount : 0) / 100)) *
                                            item.quantity
                                    )}
                                </Typography>
                            </Box>

                            {order_status === "Chờ xác nhận" ? (
                                <Box className="col-5">
                                    <Typography
                                        sx={{ color: "crimson", cursor: "pointer" }}
                                        onClick={() =>
                                            handleDelete(item.order_items_id, item.order_detail_id, item.product_id)
                                        }
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
