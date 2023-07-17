import { Box, Button, Dialog, Divider, Slide, Stack, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import Slider from "react-slick"
import { requestCreateOrder } from "~/api"
import { formatDiscount, formatPrice, formatVND } from "~/helper/format"
import React, { useEffect } from "react"
import { useState } from "react"
import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { reFetchProduct, selectorProduct } from "~/redux/productSlice"
import { CircularProgress } from "@mui/material"
import { calculatePayment } from "~/utils/calculate"
import { openSignIn, selectorCurrentUser } from "~/redux/authSlice"
import { resetCreateOrder, selectorCreateOrder } from "~/redux/orderSlice"
import { exportResponse, setResponse } from "~/redux/alertSlice"

const ButtonOrder = () => {
    const product = useSelector(selectorProduct)
    const user_id = useSelector(selectorCurrentUser)?.user?.id
    const responseOrder = useSelector(selectorCreateOrder)
    const currentUser = useSelector(selectorCurrentUser)
    const dispatch = useDispatch()

    const stock = product?.data?.stock

    const { enqueueSnackbar } = useSnackbar()
    const [open, setOpen] = React.useState(false)
    const [quantity, setQuantity] = useState(1)

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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseOrder.response])

    const handleClickOpen = () => {
        if (currentUser?.isLogged === false) return dispatch(openSignIn())
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOrder = () => {
        if (quantity > stock) {
            dispatch(setResponse({ data: { err: 0, msg: `Xin lỗi quý khách, Số lượng còn lại là ${stock}!` } }))
            dispatch(exportResponse())
            return
        }

        let orders = []
        const product_id = product?.data?.id
        orders.push({ product_id, quantity })
        requestCreateOrder(dispatch, { user_id, orders })
        setTimeout(() => {
            handleClose()
            dispatch(reFetchProduct())
        }, 2000)
    }

    return (
        <Fragment>
            {!product?.data?.inCart && (
                <Box>
                    <Button sx={styles1} onClick={handleClickOpen}>
                        <Typography>Đặt hàng</Typography>
                    </Button>

                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <Box sx={{ padding: 3 }}>
                            <Category category={product?.data?.category} />

                            <Name name={product?.data?.name} />

                            <Box sx={styles4}>
                                <Slider
                                    dots={false}
                                    arrows={false}
                                    infinite={true}
                                    speed={500}
                                    slidesToShow={1}
                                    slidesToScroll={1}
                                    autoplay={true}
                                    autoplaySpeed={2000}
                                    cssEase="linear"
                                >
                                    {product?.data &&
                                        product?.data?.images.map((item, index) => {
                                            return <img src={item.path} alt={item.originalName} key={index} />
                                        })}
                                </Slider>
                            </Box>

                            <Box sx={styles5}>
                                <Price price={product?.data?.price} discount={product?.data?.discount} />

                                <Stack width="100%">
                                    <Divider />

                                    <BoxCount quantity={quantity} setQuantity={setQuantity} stock={stock} />

                                    <SelectColor />

                                    <Divider />

                                    <AmountPayment
                                        price={product?.data?.price}
                                        discount={product?.data?.discount}
                                        quantity={quantity}
                                    />
                                </Stack>

                                {responseOrder?.isPending ? (
                                    <Button sx={style15}>
                                        <CircularProgress size={23} sx={{ color: "#fff" }} />
                                    </Button>
                                ) : (
                                    <Button onClick={handleOrder} sx={style15}>
                                        <Typography>Đặt hàng</Typography>
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Dialog>
                </Box>
            )}
        </Fragment>
    )
}

export default ButtonOrder

const Price = ({ price, discount }) => {
    return (
        <Box sx={{ width: "400px" }}>
            <Box sx={styles6}>
                {discount > 0 && <Typography sx={styles7}>{formatVND(price)}</Typography>}

                <Typography sx={styles8}>{formatPrice(price, discount)}</Typography>

                {discount && <Typography sx={styles9}>{formatDiscount(discount)}</Typography>}
            </Box>
        </Box>
    )
}

const Name = ({ name }) => {
    return <Typography sx={styles3}>{name}</Typography>
}

const Category = ({ category }) => {
    return <Typography sx={styles2}>{category}</Typography>
}

const AmountPayment = ({ price, discount, quantity }) => {
    return (
        <Stack flexDirection="row" alignItems="center" justifyContent="end" sx={style14}>
            <Typography color="#666" marginRight={1}>
                Tổng thanh toán:
            </Typography>
            <Typography color="crimson" fontWeight={500} fontSize={20}>
                {formatVND(calculatePayment(price, quantity, discount))}
            </Typography>
        </Stack>
    )
}

const SelectColor = () => {
    return (
        <Stack sx={style11}>
            <Box sx={{ width: "30%" }}>Màu sắc</Box>
            <Stack flexDirection="row">
                <Box sx={style12}></Box>
                <Box sx={style13}></Box>
            </Stack>
        </Stack>
    )
}

const BoxCount = ({ quantity, setQuantity, stock }) => {
    const handleDecrease = () => {
        if (quantity === 1) return
        setQuantity(quantity - 1)
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1)
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    }

    return (
        <Stack sx={style10}>
            <Box sx={{ width: "30%" }}>Số lượng</Box>
            <Box>
                <Box className={`col-3 box-quantity`}>
                    <Box sx={styles}>
                        <Box className="btn" onClick={handleDecrease}>
                            -
                        </Box>
                        <Box className={"count get-quantity"}>{quantity}</Box>
                        <Box className="btn" onClick={handleIncrease}>
                            +
                        </Box>
                    </Box>
                </Box>
            </Box>

            {stock && stock > 0 ? (
                <Stack ml={2} flex={1} textAlign="right">
                    <Typography color="green">Kho: {stock}</Typography>
                </Stack>
            ) : (
                <Stack ml={2} flex={1} textAlign="right">
                    <Typography color="crimson">Hết hàng</Typography>
                </Stack>
            )}
        </Stack>
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const styles1 = {
    padding: "15px 20px",
    backgroundColor: "crimson",
    color: "#fff",
    border: "2px solid transparent",

    "&:hover": {
        color: "crimson !important",
        borderColor: "crimson !important",
        backgroundColor: "#fff !important",
    },
}

const styles2 = {
    fontFamily: "'Saira Condensed', sans-serif",
    textTransform: "uppercase",
    fontSize: 20,
    textAlign: "center",
}

const styles3 = {
    fontFamily: "'Michroma', sans-serif",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 3,
}

const styles4 = {
    ".slick-slide > div": {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },

    "& img": {
        maxWidth: "350px",
    },
}

const styles5 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
}

const styles6 = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    "& :nth-child(n)": {
        marginLeft: 1,
        marginRight: 1,
    },
}

const styles7 = {
    fontFamily: "'Antic Slab', serif",
    fontSize: 23,
    fontWeight: 400,
    color: "#000",
    textDecorationLine: "line-through",
}

const styles8 = {
    fontFamily: "'Antic Slab', serif",
    fontSize: 40,
    fontWeight: 500,
    color: "crimson",
}

const styles9 = {
    fontFamily: "'Antic Slab', serif",
    fontSize: 23,
    fontWeight: 500,
    color: "crimson",
}

const style10 = {
    width: "100%",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    margin: "10px 0",
}

const style11 = {
    width: "100%",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    margin: "10px 0",
}

const style12 = {
    display: "flex",
    width: 25,
    height: 25,
    backgroundColor: "red",
    borderRadius: "50%",
    marginRight: 1,
}

const style13 = {
    display: "flex",
    width: 25,
    height: 25,
    backgroundColor: "black",
    borderRadius: "50%",
    marginRight: 1,
}

const style14 = {
    margin: "8px 0",
}

const style15 = {
    width: "182px",
    padding: "10px 0",
    backgroundColor: "crimson",
    color: "#fff",
    border: "2px solid transparent",

    "&:hover": {
        borderColor: "#a5112d !important",
        backgroundColor: "#a5112d !important",
    },
}
