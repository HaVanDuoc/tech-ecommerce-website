import {
  Avatar,
  Box,
  Checkbox,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  FormatFullName,
  formatCost,
  formatDiscount,
  formatPhoneNumber,
  formatPrice,
  formatVND,
} from "~/helper/format";
import dayjs from "dayjs";
import { PF } from "~/__variables";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { AdminTitle } from "~/admin/Styled";
import ButtonAddProduct from "./components/ButtonAddProduct";
import React, { Fragment, useEffect, useState } from "react";
import { actionConfirm, handleButtonConfirm } from "./components/handleConfirm";
import axiosInstance from "~/utils/axiosInstance";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [payment, setPayment] = useState(0); // số tiền thanh toán
  const [reset, setReset] = useState(true); // số sản phẩm đã chọn
  const codeOrder = useParams().codeOrder;

  useEffect(() => {
    const getOrders = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/admin/orders/getOrderDetails",
        data: { codeOrder },
      });

      setOrders(response.data.data);

      setPayment(response.data.data.total);
    };

    getOrders();
  }, [codeOrder, reset]);

  const personal = [
    {
      field: "Khách hàng:",
      value: FormatFullName(
        orders.firstName,
        orders.middleName,
        orders.lastName
      ),
    },
    {
      field: "Sinh ngày:",
      value: dayjs(orders.dateOfBirth).format("DD/MM/YYYY"),
    },
    { field: "Giới tính:", value: orders.gender },
    { field: "Địa chỉ:", value: orders.address },
  ];

  const contact = [
    {
      field: "Số điện thoại:",
      value: formatPhoneNumber(orders.phoneNumber),
    },
    {
      field: "Email:",
      value: orders.email,
    },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const handleSnackBar = (res) => {
    if (res.data.err === 0) {
      enqueueSnackbar(res.data.msg, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 4000,
      });
    } else {
      enqueueSnackbar(res.data.msg, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 4000,
      });
    }
  };

  const handleIncrease = (index, price, discount, order_items_id) => {
    // get value current quantity
    const currentValue = document.querySelector(
      `.box-quantity-${index} .count`
    ).innerHTML;

    // Increase it by 1 then render
    document.querySelector(`.box-quantity-${index} .count`).innerHTML =
      Number(currentValue) + 1;

    // and render price
    document.querySelector(`.box-price-${index}`).innerHTML = formatVND(
      (price - price * ((discount ? discount : 0) / 100)) *
        (Number(currentValue) + 1)
    );

    // set tổng tiền
    setPayment(
      Number(payment) +
        Number(price - price * ((discount ? discount : 0) / 100))
    );

    // update quantity
    const fetch = async () => {
      await axiosInstance({
        method: "post",
        url: "/admin/orders/orderDetails/increase",
        headers: { Authorization: localStorage.getItem("access_token") },
        data: { order_items_id },
      });
    };

    fetch();
  };

  const handleDecrease = (index, price, discount, order_items_id) => {
    // get value current quantity
    const currentValue = document.querySelector(
      `.box-quantity-${index} .count`
    ).innerHTML;

    // if value = 1 then stop
    if (currentValue === "1") return;

    // Increase it by 1 then render
    document.querySelector(`.box-quantity-${index} .count`).innerHTML =
      Number(currentValue) - 1;

    // and render price
    document.querySelector(`.box-price-${index}`).innerHTML = formatVND(
      (price - price * ((discount ? discount : 0) / 100)) *
        (Number(currentValue) - 1)
    );

    // set tổng tiền
    setPayment(
      Number(payment) -
        Number(price - price * ((discount ? discount : 0) / 100))
    );

    // update quantity
    const fetch = async () => {
      await axiosInstance({
        method: "post",
        url: "/admin/orders/orderDetails/decrease",
        headers: { Authorization: localStorage.getItem("access_token") },
        data: { order_items_id },
      });
    };

    fetch();
  };

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
      });

      handleSnackBar(response);

      setReset(!reset); // Refresh data
    };

    deleteProduct();
  };

  const buttonConfirm = handleButtonConfirm(orders.order_status);

  const handleClick = (actionConfirm, actionConfirmed, codeOrder) => {
    const request = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/admin/orders/handleOrderStatus",
        headers: { Authorization: localStorage.getItem("access_token") },
        data: { actionConfirm, actionConfirmed, codeOrder },
      });

      handleSnackBar(response);
    };

    request();

    setReset(!reset);
  };

  return (
    <Styled>
      <AdminTitle>Chi tiết hóa đơn</AdminTitle>

      <Information className="information">
        <InfoCustomer className="section">
          <Title>Thông tin khách hàng</Title>

          {personal.map((item, index) => {
            return (
              <FieldInfo index={index} name={item.field} value={item.value} />
            );
          })}
        </InfoCustomer>

        <InfoContact className="section" marginLeft={2} marginRight={2}>
          <Title>Thông tin liên hệ</Title>

          {contact.map((item, index) => {
            return (
              <FieldInfo index={index} name={item.field} value={item.value} />
            );
          })}
        </InfoContact>

        <Contact className="section">
          <Title>Liên lạc</Title>

          <Stack flexDirection="row" sx={styles2}>
            <AvatarCustomer sx={{ aspectRatio: "1/1" }}>
              <Avatar
                src={orders.avatar}
                alt=""
                sx={{ width: "80%", height: "80%" }}
              />
            </AvatarCustomer>
            <MessageCustomer flex={1} className="icon">
              <Stack justifyContent="center" alignItems="center">
                <img
                  src={PF + "/assets/admin-order-detail/icon-message.png"}
                  alt=""
                />
                <Typography>Gửi lời nhắn</Typography>
              </Stack>
            </MessageCustomer>
            <CallCustomer flex={1} className="icon">
              <Stack justifyContent="center" alignItems="center">
                <img
                  src={PF + "/assets/admin-order-detail/icon-call-phone.png"}
                  alt=""
                />
                <Typography>Gọi điện</Typography>
              </Stack>
            </CallCustomer>
            ``
          </Stack>
        </Contact>
      </Information>

      <ListOrders>
        <Container maxWidth="lg" disableGutters>
          <Fragment>
            <Box
              sx={{
                borderRadius: "5px",
                backgroundColor: "#fff",
                margin: "30px 24px",
              }}
            >
              <Option>
                <Stack sx={styles1}>
                  <Box>
                    <Typography variant="span" fontWeight={500}>
                      Đơn hàng{" "}
                    </Typography>
                    <Typography
                      variant="span"
                      color="dodgerblue"
                      fontWeight={500}
                    >
                      {orders.order_code}
                    </Typography>
                  </Box>

                  <Stack flexDirection="row" alignItems="center">
                    <Typography variant="span" fontWeight={500}>
                      Ngày đặt{" "}
                    </Typography>
                    <Typography
                      variant="span"
                      fontWeight={500}
                      color="dodgerblue"
                      marginLeft={0.8}
                      marginRight={2}
                    >
                      {dayjs(orders.createdAt).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography
                      variant="span"
                      fontWeight={500}
                      color="crimson"
                      textTransform="uppercase"
                    >
                      {orders.order_status}
                    </Typography>
                  </Stack>
                </Stack>

                {/* title */}
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

                {/* Content */}
                <Box className="content">
                  {orders.order_list ? (
                    orders.order_list.map((item, index) => {
                      return (
                        <Box
                          className={`item col cart-item-${index}`}
                          key={index}
                        >
                          {/* CheckBox */}
                          <Box className="col-0">
                            <Checkbox className={`box-select-${index}`} />

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
                                  src={
                                    item.image
                                      ? JSON.parse(item.image)[0].base64
                                      : ""
                                  }
                                  alt=""
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
                                  <Typography>{`${item.category} ${item.name_product}`}</Typography>
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
                          {orders.order_status === "Chờ xác nhận" ? (
                            <Box className={`col-3 box-quantity-${index}`}>
                              <Box sx={styles}>
                                <Box
                                  className="btn"
                                  onClick={() =>
                                    handleDecrease(
                                      index,
                                      item.price,
                                      item.discount,
                                      item.order_items_id
                                    )
                                  }
                                >
                                  -
                                </Box>
                                <Box className={`count get-quantity-${index}`}>
                                  {item.quantity}
                                </Box>
                                <Box
                                  className="btn"
                                  onClick={() =>
                                    handleIncrease(
                                      index,
                                      item.price,
                                      item.discount,
                                      item.order_items_id
                                    )
                                  }
                                >
                                  +
                                </Box>
                              </Box>
                            </Box>
                          ) : (
                            <Box
                              className={`col-3 count get-quantity-${index}`}
                            >
                              {item.quantity}
                            </Box>
                          )}

                          {/* Số tiền */}
                          <Box className="col-4">
                            <Typography
                              className={`box-price-${index}`}
                              sx={{ color: "crimson" }}
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
                          {orders.order_status === "Chờ xác nhận" ? (
                            <Box className="col-5">
                              <Typography
                                sx={{
                                  color: "crimson",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleDelete(
                                    item.order_items_id,
                                    item.order_detail_id,
                                    item.product_id
                                  )
                                }
                              >
                                Xóa
                              </Typography>
                            </Box>
                          ) : (
                            <Box className="col-5">
                              <Typography
                                sx={{
                                  color: "crimson",
                                  cursor: "pointer",
                                }}
                              >
                                ...
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      );
                    })
                  ) : (
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      height={200}
                    >
                      <CircularProgress />
                    </Stack>
                  )}
                </Box>

                {/*  */}
                <Payment>
                  <Box
                    sx={{
                      padding: "10px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {orders.order_status === "Chờ xác nhận" && (
                      <ButtonAddProduct
                        order_detail_id={orders.order_id}
                        reset={reset}
                        setReset={setReset}
                      />
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "end",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Typography>
                        Tổng tiền (
                        {orders.order_list ? orders.order_list.length : 0} sản
                        phẩm):{" "}
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

                      {buttonConfirm?.action.map((item, index) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              marginLeft: 3,
                              backgroundColor: "crimson",
                              border: "1px solid crimson",
                              borderRadius: "5px",
                              color: "#fff",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: "10px 30px",
                              cursor: "pointer",
                              boxShadow: "0 1px 5px 1px rgba(0, 0, 0, 0.25)",
                              transition: "all .2s ease-in-out",

                              ":hover": {
                                boxShadow: "0 1px 5px 5px rgba(0, 0, 0, 0.25)",
                              },
                            }}
                            onClick={() =>
                              handleClick(
                                actionConfirm,
                                item,
                                orders.order_code
                              )
                            }
                          >
                            {item}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Payment>
              </Option>
            </Box>
          </Fragment>
        </Container>
      </ListOrders>
    </Styled>
  );
};

export default OrderDetails;

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
}));

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
};

const Styled = styled(Box)(() => ({
  flex: 1,
  paddingLeft: 16,
  paddingRight: 16,
}));

const Title = ({ children }) => {
  return (
    <Stack>
      <Typography color="#666" fontWeight={500} marginBottom={1}>
        {children}
      </Typography>
    </Stack>
  );
};

const FieldInfo = ({ index, name, value }) => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="start"
      alignItems="center"
      key={index}
    >
      <Stack mr={2}>{name}</Stack>
      <Stack fontWeight={500}>{value}</Stack>
    </Stack>
  );
};

const InfoCustomer = styled(Stack)(() => ({}));
const InfoContact = styled(Stack)(() => ({}));
const Contact = styled(Stack)(() => ({}));
const ListOrders = styled(Stack)(() => ({}));

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
}));

const AvatarCustomer = styled(Stack)(() => ({}));
const MessageCustomer = styled(Stack)(() => ({}));
const CallCustomer = styled(Stack)(() => ({}));

const styles1 = {
  padding: "24px 16px",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

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
};

const Payment = styled(Box)(() => ({
  borderRadius: "0 0 5px 5px",
  boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#fff",
  position: "sticky",
  bottom: 0,
  zIndex: 2,
}));
