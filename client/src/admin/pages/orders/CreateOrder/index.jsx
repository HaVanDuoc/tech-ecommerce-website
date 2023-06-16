import { Avatar, Box, CircularProgress, Container, Grid, Stack, Typography, styled } from "@mui/material"
import { formatCost, formatDiscount, formatPhoneNumber, formatPrice, formatVND } from "~/helper/format"
import dayjs from "dayjs"
import { PF } from "~/utils/__variables"
import { useSnackbar } from "notistack"
import { useParams } from "react-router-dom"
import { AdminTitle } from "~/admin/Styled"
import React, { Fragment, useEffect, useState } from "react"
import ButtonAddProductInCreateOrder from "../components/ButtonAddProductInCreateOrder"
import { requestCreateOrderAdmin, requestUser } from "~/api"
import { useDispatch, useSelector } from "react-redux"
import { selectorUser } from "~/redux/userSlice"
import { resetCreateOrder, selectorCreateOrder } from "~/redux/orderSlice"

const CreateOrder = () => {
    const [orders, setOrders] = useState([])
    const [payment, setPayment] = useState(0) // số tiền thanh toán
    const [reset, setReset] = useState(true) // số sản phẩm đã chọn
    const user_id = useParams().user_id
    const dispatch = useDispatch()

    const user = useSelector(selectorUser)?.data
    const responseOrder = useSelector(selectorCreateOrder)

    useEffect(() => {
        requestUser(dispatch, { user_id })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let totalPayment = 0

        orders.map((item) => {
            return (totalPayment =
                totalPayment +
                Number((item.price - item.price * ((item.discount ? item.discount : 0) / 100)) * item.quantity))
        })

        setPayment(totalPayment)
    }, [orders])

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

    useEffect(() => {
        if (responseOrder?.response) {
            handleSnackBar(responseOrder?.response)
            dispatch(resetCreateOrder())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseOrder.response])

    const personal = [
        {
            field: "Khách hàng:",
            value: user.fullName,
        },
        {
            field: "Sinh ngày:",
            value: dayjs(user.dateOfBirth).format("DD/MM/YYYY"),
        },
        { field: "Giới tính:", value: user.gender },
        { field: "Địa chỉ:", value: user.address },
    ]

    const contact = [
        {
            field: "Số điện thoại:",
            value: formatPhoneNumber(user.phoneNumber),
        },
        {
            field: "Email:",
            value: user.email,
        },
    ]

    const handleIncrease = (index, price, discount) => {
        // get value current quantity
        const currentValue = document.querySelector(`.box-quantity-${index} .count`).innerHTML

        // Increase it by 1 then render
        document.querySelector(`.box-quantity-${index} .count`).innerHTML = Number(currentValue) + 1

        // and render price
        document.querySelector(`.box-price-${index}`).innerHTML = formatVND(
            (price - price * ((discount ? discount : 0) / 100)) * (Number(currentValue) + 1)
        )

        orders[index].quantity = Number(currentValue) + 1

        // set tổng tiền
        setPayment(Number(payment) + Number(price - price * ((discount ? discount : 0) / 100)))
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

        orders[index].quantity = Number(currentValue) - 1

        // set tổng tiền
        setPayment(Number(payment) - Number(price - price * ((discount ? discount : 0) / 100)))
    }

    const handleDelete = (itemInState) => {
        setOrders(
            orders.filter((child) => {
                return child !== itemInState
            })
        )
    }

    const handleComplete = () => {
        const status_id = 4
        requestCreateOrderAdmin(dispatch, { user_id, orders, status_id })
        setOrders([])
    }

    return (
        <Styled>
            <AdminTitle>Tạo hóa đơn</AdminTitle>

            <Information className="information">
                <InfoCustomer className="section">
                    <Title>Thông tin khách hàng</Title>

                    {personal.map((item, index) => {
                        return <FieldInfo index={index} name={item.field} value={item.value} />
                    })}
                </InfoCustomer>

                <InfoContact className="section" marginLeft={2} marginRight={2}>
                    <Title>Thông tin liên hệ</Title>

                    {contact.map((item, index) => {
                        return <FieldInfo index={index} name={item.field} value={item.value} />
                    })}
                </InfoContact>

                <Contact className="section">
                    <Title>Liên lạc</Title>

                    <Stack flexDirection="row" sx={styles2}>
                        <AvatarCustomer sx={{ aspectRatio: "1/1" }}>
                            <Avatar src={user.avatar} alt="" sx={{ width: "80%", height: "80%" }} />
                        </AvatarCustomer>
                        <MessageCustomer flex={1} className="icon">
                            <Stack justifyContent="center" alignItems="center">
                                <img src={PF + "/assets/admin-order-detail/icon-message.png"} alt="" />
                                <Typography>Gửi lời nhắn</Typography>
                            </Stack>
                        </MessageCustomer>
                        <CallCustomer flex={1} className="icon">
                            <Stack justifyContent="center" alignItems="center">
                                <img src={PF + "/assets/admin-order-detail/icon-call-phone.png"} alt="" />
                                <Typography>Gọi điện</Typography>
                            </Stack>
                        </CallCustomer>
                    </Stack>
                </Contact>
            </Information>

            <ListOrders>
                <Container maxWidth="lg" disableGutters>
                    <Fragment>
                        <Box sx={style1}>
                            <Option>
                                <Box className="title col">
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

                                <Box className="content">
                                    {orders.length ? (
                                        orders.map((item, index) => {
                                            return (
                                                <Box className={`item col cart-item-${index}`} key={index}>
                                                    <Product
                                                        name={item.name}
                                                        category={item.category}
                                                        image={item.image}
                                                    />

                                                    <UnitPrice price={item.price} discount={item.discount} />

                                                    <Count
                                                        index={index}
                                                        price={item.price}
                                                        discount={item.discount}
                                                        quantity={item.quantity}
                                                        handleDecrease={handleDecrease}
                                                        handleIncrease={handleIncrease}
                                                    />

                                                    <AmountOfMoney
                                                        index={index}
                                                        price={item.price}
                                                        discount={item.discount}
                                                        quantity={item.quantity}
                                                    />

                                                    <Action onClick={() => handleDelete(item)} />
                                                </Box>
                                            )
                                        })
                                    ) : (
                                        <NoProduct>Chưa có sản phẩm nào!</NoProduct>
                                    )}
                                </Box>

                                <Payment>
                                    <Stack
                                        justifyContent="space-between"
                                        alignItems="center"
                                        flexDirection="row"
                                        padding="10px 24px"
                                    >
                                        <ButtonAddProductInCreateOrder
                                            orders={orders}
                                            setOrders={setOrders}
                                            reset={reset}
                                            setReset={setReset}
                                        />

                                        <HienCoXSanPham orderLength={orders ? orders.length : 0} />

                                        <Stack flex={1} justifyContent="end" alignItems="center" flexDirection="row">
                                            <TongTien payment={payment} />

                                            {responseOrder?.isPending ? (
                                                <ButtonComplete>
                                                    <CircularProgress size={23} sx={{ color: "#fff" }} />
                                                </ButtonComplete>
                                            ) : (
                                                <ButtonComplete onClick={handleComplete}>Hoàn tất</ButtonComplete>
                                            )}
                                        </Stack>
                                    </Stack>
                                </Payment>
                            </Option>
                        </Box>
                    </Fragment>
                </Container>
            </ListOrders>
        </Styled>
    )
}

export default CreateOrder

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
        boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.25);",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 3,
        borderRadius: "10px 10px 0 0",
        overflow: "hidden",

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

const Styled = styled(Box)(() => ({
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
}))

const Title = ({ children }) => {
    return (
        <Stack>
            <Typography color="#666" fontWeight={500} marginBottom={1}>
                {children}
            </Typography>
        </Stack>
    )
}

const FieldInfo = ({ index, name, value }) => {
    return (
        <Stack flexDirection="row" justifyContent="start" alignItems="center" key={index}>
            <Stack mr={2}>{name}</Stack>
            <Stack fontWeight={500}>{value}</Stack>
        </Stack>
    )
}

const InfoCustomer = styled(Stack)(() => ({}))
const InfoContact = styled(Stack)(() => ({}))
const Contact = styled(Stack)(() => ({}))
const ListOrders = styled(Stack)(() => ({}))

const Information = styled(Stack)(() => ({
    flexDirection: "row",
    marginLeft: 24,
    marginRight: 24,

    ".section": {
        flex: 1,
        boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.15)",
        borderRadius: 15,
        padding: "10px 20px",
    },
}))

const AvatarCustomer = styled(Stack)(() => ({}))
const MessageCustomer = styled(Stack)(() => ({}))
const CallCustomer = styled(Stack)(() => ({}))

const styles2 = {
    "& > :nth-child(n)": {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    ".icon": {
        cursor: "pointer",

        ":hover": {
            "& p": {
                color: "dodgerblue",
            },
        },

        "& img": {
            width: 50,
            height: 50,
        },

        "& p": {
            fontWeight: 500,
        },
    },
}

const Payment = styled(Box)(() => ({
    borderRadius: "0 0 5px 5px",
    boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#fff",
    position: "sticky",
    bottom: 0,
    zIndex: 2,
}))

const Product = ({ name, category, image }) => (
    <Box className="col-1">
        <Grid container spacing={1} flexDirection="row">
            <Grid item xs={4}>
                <img src={image} alt="" width="100%" />
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
                    <Typography>{`${category} ${name}`}</Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
)

const UnitPrice = ({ price, discount }) => (
    <Box className="col-2 field-bill">
        {discount && (
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
                <Typography variant="span" color="#666" fontSize="14px">
                    {formatCost(price)}
                </Typography>
                <Typography variant="span" color="crimson" fontWeight={500} fontSize="14px">
                    {formatDiscount(discount)}
                </Typography>
            </Typography>
        )}
        <Typography>{formatPrice(price, discount)}</Typography>
    </Box>
)

const Count = ({ index, price, discount, quantity, order_items_id, handleDecrease, handleIncrease }) => {
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

    return (
        <Box className={`col-3 box-quantity-${index}`}>
            <Box sx={styles}>
                <Box className="btn" onClick={() => handleDecrease(index, price, discount, order_items_id)}>
                    -
                </Box>
                <Box className={`count get-quantity-${index}`}>{quantity}</Box>
                <Box className="btn" onClick={() => handleIncrease(index, price, discount, order_items_id)}>
                    +
                </Box>
            </Box>
        </Box>
    )
}

const AmountOfMoney = ({ index, price, discount, quantity }) => (
    <Box className="col-4">
        <Typography className={`box-price-${index}`} sx={{ color: "crimson" }}>
            {formatVND((price - price * ((discount ? discount : 0) / 100)) * quantity)}
        </Typography>
    </Box>
)

const Action = ({ onClick }) => (
    <Box className="col-5">
        <Typography
            sx={{
                color: "crimson",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            Xóa
        </Typography>
    </Box>
)

const NoProduct = ({ children }) => (
    <Stack justifyContent="center" alignItems="center" height={200}>
        <Typography>{children}</Typography>
    </Stack>
)

const HienCoXSanPham = ({ orderLength }) => (
    <Typography>
        Hiện có{" "}
        <Typography fontWeight={500} variant="span">
            {orderLength}
        </Typography>{" "}
        sản phẩm
    </Typography>
)

const TongTien = ({ payment }) => (
    <Typography>
        Tổng tiền:{" "}
        <Typography
            id="total-money"
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
)

const ButtonComplete = ({ children, onClick }) => {
    return (
        <Box
            sx={{
                width: "123px",
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
            }}
            onClick={onClick}
        >
            {children}
        </Box>
    )
}

const style1 = {
    borderRadius: "5px",
    backgroundColor: "#fff",
    margin: "30px 24px",
}
