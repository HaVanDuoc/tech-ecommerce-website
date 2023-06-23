import { formatCost, formatDiscount, formatPrice, formatVND } from "~/helper/format"
import { Box, Checkbox, CircularProgress, Container, Grid, styled, Typography } from "@mui/material"
import React, { Fragment, useEffect, useState } from "react"
import { Footer } from "~/components"
import { useDispatch, useSelector } from "react-redux"
import { useSnackbar } from "notistack"
import { refetchCart, selectorCartProducts } from "~/redux/productSlice"
import {
    requestCartProduct,
    requestCreateOrder,
    requestDecreaseProductCart,
    requestDeleteProductCart,
    requestIncreaseProductCart,
} from "~/api"
import CartEmpty from "./components/CartEmpty"
import Loading from "./components/Loading"
import HeaderCart from "./components/HeaderCart"
import { selectorCurrentUser } from "~/redux/authSlice"
import { resetCreateOrder, selectorCreateOrder } from "~/redux/orderSlice"

const Cart = () => {
    const [payment, setPayment] = useState(0) // số tiền thanh toán
    const [paymentProductNumber, setPaymentProductNumber] = useState(0) // số sản phẩm đã chọn
    const [selectedProduct, setSelectedProduct] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()

    const cart = useSelector(selectorCartProducts)
    const products = useSelector(selectorCartProducts)?.data?.products
    const cart_session_id = useSelector(selectorCartProducts)?.data?.cart_session_id
    const user_id = useSelector(selectorCurrentUser)?.user?.id
    const responseOrder = useSelector(selectorCreateOrder)

    useEffect(() => {
        requestCartProduct(dispatch)
    }, [dispatch, cart.refetch])

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

    useEffect(() => {
        if (responseOrder?.response) {
            handleSnackBar(responseOrder?.response)
            dispatch(resetCreateOrder())
            dispatch(refetchCart())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseOrder.response])

    const handleIncrease = (index) => {
        const product_id = products[index].id
        const price = products[index].price
        const discount = products[index].discount

        // get value current quantity
        const currentValue = document.querySelector(`.box-quantity-${index} .count`).innerHTML

        // Increase it by 1 then render
        document.querySelector(`.box-quantity-${index} .count`).innerHTML = Number(currentValue) + 1

        // and render price
        document.querySelector(`.box-price-${index}`).innerHTML = formatVND(
            (price - price * ((discount ? discount : 0) / 100)) * (Number(currentValue) + 1)
        )

        // update quantity
        requestIncreaseProductCart(product_id, cart_session_id)

        // update payment
        // cũng giống dưới handleSelect
        // cart item này phải check rồi mới thực thi setPayment
        // còn không kệ mẹ
        if (document.querySelector(`.box-select-${index}`).classList.contains("Mui-checked")) {
            setPayment(Number(payment) + Number(price - price * ((discount ? discount : 0) / 100)))
        }
    }

    const handleDecrease = (index) => {
        const product_id = products[index].id
        const price = products[index].price
        const discount = products[index].discount

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

        // update quantity
        requestDecreaseProductCart(product_id, cart_session_id)

        // update payment
        // cũng giống dưới handleSelect
        // cart item này phải check rồi mới thực thi setPayment
        // còn không kệ mẹ
        if (document.querySelector(`.box-select-${index}`).classList.contains("Mui-checked")) {
            setPayment(Number(payment) - Number(price - price * ((discount ? discount : 0) / 100)))
        }
    }

    const handleDelete = (index) => {
        const product_id = products[index].id

        requestDeleteProductCart(product_id, cart_session_id)
        dispatch(refetchCart())
    }

    const handleSelect = (index) => {
        const price = products[index].price
        const discount = products[index].discount

        // vì trước đó là thay đổi value của element thôi
        // ko thay đổi gì về fetch hay setState
        // nên phải dùng querySelector để xác định giá trị
        const quantity = document.querySelector(`.get-quantity-${index}`).innerHTML

        // Lấy số tiền hiện có
        const money = (price - price * ((discount ? discount : 0) / 100)) * quantity

        // checked === false
        // Nếu có chứa class `Mui-checked` thì đã chọn từ trước
        // chưa chọn thì ko có
        // nên đây là bỏ select
        // trừ tiền đi
        if (document.querySelector(`.box-select-${index}`).classList.contains("Mui-checked")) {
            setPayment(payment - money)
            setPaymentProductNumber(paymentProductNumber - 1)
            setSelectedProduct(selectedProduct.filter((item) => item !== index)) // Loại index của cart_item đã chọn

            return
        }

        // checked === true
        // Đây là chọn đây nên phải tăng payment lên
        setPayment(payment + money)
        setPaymentProductNumber(paymentProductNumber + 1)
        selectedProduct.push(index) // thêm index cart_item vào selectedProduct để check order
    }

    const handleOrder = () => {
        let orders = []

        // Nếu chưa chọn sản phẩm thì dừng
        if (!selectedProduct.length) return

        selectedProduct.map((index) => {
            const product_id = products[index].id
            const quantity = Number(document.querySelector(`.count.get-quantity-${index}`).innerHTML)
            orders.push({ product_id, quantity })
            return orders
        })

        requestCreateOrder(dispatch, { user_id, orders })
    }

    return (
        <Root>
            <HeaderCart />

            <ContentCart>
                <Container maxWidth="lg" disableGutters>
                    {cart.isPending ? (
                        <Loading />
                    ) : products && products.length ? (
                        <Fragment>
                            <Box sx={{ borderRadius: "5px", backgroundColor: "#fff", margin: "30px 24px" }}>
                                <Option>
                                    <Title />

                                    <Box className="content">
                                        {products &&
                                            products.map((item, index) => {
                                                return (
                                                    <Box className={`item col cart-item-${index}`} key={index}>
                                                        {/* CheckBox */}
                                                        <Box className="col-0">
                                                            <Checkbox
                                                                className={`box-select-${index}`}
                                                                onClick={() => handleSelect(index)}
                                                            />

                                                            <Box
                                                                sx={{ display: "none" }}
                                                                className={`box-product-id-${index}`}
                                                            >
                                                                {item.id}
                                                            </Box>
                                                        </Box>

                                                        {/* Sản phẩm */}
                                                        <Box className="col-1">
                                                            <Grid container spacing={1} flexDirection="row">
                                                                <Grid item xs={4}>
                                                                    <img
                                                                        src={item.files[0].path}
                                                                        alt={item.files[0].originalName}
                                                                        width="100%"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs>
                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            justifyContent: "start",
                                                                            alignItems: "center",
                                                                            height: "100%",
                                                                        }}
                                                                    >
                                                                        <Typography>{item.name}</Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>

                                                        {/* Đơn giá */}
                                                        <Box className="col-2 field-bill">
                                                            {item?.discount && (
                                                                <Typography
                                                                    sx={{
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",

                                                                        "span:nth-child(n)": {
                                                                            marginLeft: "5px",
                                                                        },
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="span"
                                                                        color="#666"
                                                                        fontSize="14px"
                                                                    >
                                                                        {formatCost(item.price)}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="span"
                                                                        color="crimson"
                                                                        fontWeight={500}
                                                                        fontSize="14px"
                                                                    >
                                                                        {formatDiscount(item.discount)}
                                                                    </Typography>
                                                                </Typography>
                                                            )}
                                                            <Typography>
                                                                {formatPrice(item.price, item.discount)}
                                                            </Typography>
                                                        </Box>

                                                        {/* Số lượng */}
                                                        <Box className={`col-3 box-quantity-${index}`}>
                                                            <Box sx={styles}>
                                                                <Box
                                                                    className="btn"
                                                                    onClick={() => handleDecrease(index)}
                                                                >
                                                                    -
                                                                </Box>
                                                                <Box className={`count get-quantity-${index}`}>
                                                                    {item.quantity}
                                                                </Box>
                                                                <Box
                                                                    className="btn"
                                                                    onClick={() => handleIncrease(index)}
                                                                >
                                                                    +
                                                                </Box>
                                                            </Box>
                                                        </Box>

                                                        {/* Số tiền */}
                                                        <Box className="col-4">
                                                            <Typography
                                                                className={`box-price-${index}`}
                                                                sx={{
                                                                    color: "crimson",
                                                                }}
                                                            >
                                                                {formatVND(
                                                                    (item.price -
                                                                        item.price *
                                                                            ((item.discount ? item.discount : 0) /
                                                                                100)) *
                                                                        item.quantity
                                                                )}
                                                            </Typography>
                                                        </Box>

                                                        {/* Thao tác */}
                                                        <Box className="col-5">
                                                            <Typography
                                                                sx={{
                                                                    color: "crimson",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => handleDelete(index)}
                                                            >
                                                                Xóa
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                )
                                            })}
                                    </Box>

                                    {/* Payment */}
                                    <Payment>
                                        <Box
                                            sx={{
                                                padding: "10px 24px",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <Checkbox />
                                                <Typography
                                                    sx={{
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    Chọn tất cả ({paymentProductNumber})
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <Typography>
                                                    Tổng thanh toán ({paymentProductNumber} sản phẩm):{" "}
                                                    <Typography
                                                        variant="span"
                                                        sx={{
                                                            color: "crimson",
                                                            fontWeight: 600,
                                                            fontSize: "1.2rem",
                                                        }}
                                                    >
                                                        {formatVND(payment)}
                                                    </Typography>
                                                </Typography>

                                                {responseOrder?.isPending ? (
                                                    <Box sx={style1}>
                                                        <CircularProgress size={20} sx={{ color: "#fff" }} />
                                                    </Box>
                                                ) : (
                                                    <Box sx={style1} onClick={handleOrder}>
                                                        Đặt hàng
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </Payment>
                                </Option>
                            </Box>
                        </Fragment>
                    ) : (
                        <CartEmpty />
                    )}
                </Container>
            </ContentCart>

            <Footer />
        </Root>
    )
}

export default Cart

const Title = () => {
    return (
        <Box className="title col">
            <Box className="col-0">
                <Checkbox />
            </Box>
            <Box className="col-1">
                <Typography>Sản phẩm</Typography>
            </Box>
            <Box className="col-2">
                <Typography>Đơn giá</Typography>
            </Box>
            <Box className="col-3">
                <Typography>Số lượng</Typography>
            </Box>
            <Box className="col-4">
                <Typography>Số tiền</Typography>
            </Box>
            <Box className="col-5">
                <Typography>Thao tác</Typography>
            </Box>
        </Box>
    )
}

const Payment = styled(Box)(() => ({
    borderRadius: "0 0 5px 5px",
    boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#fff",
    position: "sticky",
    bottom: 0,
    zIndex: 2,
}))

const Option = styled(Box)(() => ({
    boxShadow: "0 0px 1px 0px rgba(0,0,0.25)",
    borderRadius: "5px",

    ".col": {
        width: "100%",

        ".col-1": {
            width: "40%",
        },
        ".col-2": {
            width: "15%",
            textAlign: "center",
        },
        ".col-3": {
            width: "15%",
            textAlign: "center",
        },
        ".col-4": {
            width: "15%",
            textAlign: "center",
        },
        ".col-5": {
            width: "15%",
            textAlign: "center",
        },
    },

    ".title": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60px",
        padding: "0 24px",
        borderBottom: "1px solid #ccc",
        borderRadius: "5px 5px 0 0",
        boxShadow: "0 1px 5px rgba(0,0,0,0.125)",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 3,

        p: {
            color: "#666",
        },
    },

    ".content": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        ".item": {
            padding: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
        },
    },
}))

const ContentCart = styled(Box)(() => ({
    paddingBottom: 4,
}))

const Root = styled(Box)(() => ({
    position: "relative",
}))

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

const style1 = {
    width: "128px",
    marginLeft: 3,
    backgroundColor: "crimson",
    border: "1px solid crimson",
    borderRadius: "5px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
    cursor: "pointer",
    boxShadow: "0 1px 5px 1px rgba(0, 0, 0, 0.25)",
    transition: "all .2s ease-in-out",

    ":hover": {
        boxShadow: "0 1px 5px 5px rgba(0, 0, 0, 0.25)",
    },
}
