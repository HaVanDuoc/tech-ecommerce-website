import {
  formatCost,
  formatDiscount,
  formatPrice,
  formatVND,
} from "~/helper/format";
import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { Brand } from "~/components/Header";
import AccountMenu from "~/components/Header/AccountMenu";
import { Footer } from "~/components";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";
import { PF } from "~/__variables";
import TopBar from "~/components/Header/TopBar";
import { useSnackbar } from "notistack";
import { selectorCart } from "~/redux/cart/reudcer";
import { GetCart } from "~/redux/cart/action";
import Search from "~/components/Search";
import axiosInstance from "~/utils/axiosInstance";

const Cart = () => {
  const [reFetch, setReFetch] = useState(true); // Đơn giản là sử dụng để reset dữ liệu fetch về thôi
  const [payment, setPayment] = useState(0); // số tiền thanh toán
  const [paymentProductNumber, setPaymentProductNumber] = useState(0); // số sản phẩm đã chọn
  const [selectedProduct, setSelectedProduct] = useState([]);
  const currentUser = useSelector(selectorCurrentUser);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const cart = useSelector(selectorCart);

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/client/cart",
        data: {
          user_id: currentUser.isLogged ? currentUser.user.data.id : null,
        },
      });

      dispatch(GetCart(response.data));
    };

    fetch();
  }, [currentUser, reFetch, dispatch]); // ở bất kỳ đâu chỉ cần setReFetch là có thể làm mới fetch này

  // console.log("payment", payment);

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

  const handleIncrease = (
    index,
    price,
    discount,
    product_id,
    cart_session_id
  ) => {
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

    // update quantity
    const fetch = async () => {
      await axiosInstance({
        method: "post",
        url: "/client/cart/increase",
        data: {
          product_id,
          cart_session_id,
        },
      });
    };

    fetch();

    // update payment
    // cũng giống dưới handleSelect
    // cart item này phải check rồi mới thực thi setPayment
    // còn không kệ mẹ
    if (
      document
        .querySelector(`.box-select-${index}`)
        .classList.contains("Mui-checked")
    ) {
      setPayment(
        Number(payment) +
          Number(price - price * ((discount ? discount : 0) / 100))
      );
    }
  };

  const handleDecrease = (
    index,
    price,
    discount,
    product_id,
    cart_session_id
  ) => {
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

    // update quantity
    const fetch = async () => {
      await axiosInstance({
        method: "post",
        url: "/client/cart/decrease",
        data: {
          product_id,
          cart_session_id,
        },
      });
    };

    fetch();

    // update payment
    // cũng giống dưới handleSelect
    // cart item này phải check rồi mới thực thi setPayment
    // còn không kệ mẹ
    if (
      document
        .querySelector(`.box-select-${index}`)
        .classList.contains("Mui-checked")
    ) {
      setPayment(
        Number(payment) -
          Number(price - price * ((discount ? discount : 0) / 100))
      );
    }
  };

  const handleDelete = (index, product_id, cart_session_id) => {
    // Request to server delete item
    const fetch = async () => {
      await axiosInstance({
        method: "delete",
        url: "/client/cart/delete",
        data: {
          product_id,
          cart_session_id,
        },
      });
    };

    fetch();

    setReFetch(!reFetch);
  };

  const handleSelect = (index, price, discount) => {
    // vì trước đó là thay đổi value của element thôi
    // ko thay đổi gì về fetch hay setState
    // nên phải dùng querySelector để xác định giá trị
    const quantity = document.querySelector(`.get-quantity-${index}`).innerHTML;

    // Lấy số tiền hiện có
    const money =
      (price - price * ((discount ? discount : 0) / 100)) * quantity;

    // checked === false
    // Nếu có chứa class `Mui-checked` thì đã chọn từ trước
    // chưa chọn thì ko có
    // nên đây là bỏ select
    // trừ tiền đi
    if (
      document
        .querySelector(`.box-select-${index}`)
        .classList.contains("Mui-checked")
    ) {
      setPayment(payment - money);
      setPaymentProductNumber(paymentProductNumber - 1);
      setSelectedProduct(selectedProduct.filter((item) => item !== index)); // Loại index của cart_item đã chọn

      return;
    }

    // checked === true
    // Đây là chọn đây nên phải tăng payment lên
    setPayment(payment + money);
    setPaymentProductNumber(paymentProductNumber + 1);
    selectedProduct.push(index); // thêm index cart_item vào selectedProduct để check order
  };

  const handleOrder = () => {
    let order = [];

    // Nếu chưa chọn sản phẩm thì dừng
    if (!selectedProduct.length) return;

    selectedProduct.map((item) => {
      const user_id = currentUser.user.data.id;

      const product_id = document.querySelector(
        `.cart-item-${item} .box-product-id-${item}`
      ).innerHTML;

      const quantity = document.querySelector(
        `.cart-item-${item} .get-quantity-${item}`
      ).innerHTML;

      const totalPayment = payment;

      const cart_sessions_id = currentUser.user.data.cart_sessions_id;

      order.push({
        user_id,
        product_id,
        quantity,
        totalPayment,
        cart_sessions_id,
      });

      return order;
    });

    const fetch = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/client/cart/order",
        data: order,
      });

      setReFetch(!reFetch); // reset fetch

      handleSnackBar(response); // xuất thông báo
    };

    fetch();
  };

  return (
    <Root>
      <HeaderCart />

      <ContentCart>
        <Container maxWidth="lg" disableGutters>
          {cart.isFetch ? (
            cart.payload.data ? (
              <Fragment>
                <Box
                  sx={{
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    margin: "30px 24px",
                  }}
                >
                  <Option>
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
                      {cart.payload.data &&
                        cart.payload.data.map((item, index) => {
                          return (
                            <Box
                              className={`item col cart-item-${index}`}
                              key={index}
                            >
                              {/* CheckBox */}
                              <Box className="col-0">
                                <Checkbox
                                  className={`box-select-${index}`}
                                  onClick={() =>
                                    handleSelect(
                                      index,
                                      item.price,
                                      item.discount
                                    )
                                  }
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
                                    onClick={() =>
                                      handleDecrease(
                                        index,
                                        item.price,
                                        item.discount,
                                        item.id,
                                        item.cart_session_id
                                      )
                                    }
                                  >
                                    -
                                  </Box>
                                  <Box
                                    className={`count get-quantity-${index}`}
                                  >
                                    {item.quantity}
                                  </Box>
                                  <Box
                                    className="btn"
                                    onClick={() =>
                                      handleIncrease(
                                        index,
                                        item.price,
                                        item.discount,
                                        item.id,
                                        item.cart_session_id
                                      )
                                    }
                                  >
                                    +
                                  </Box>
                                </Box>
                              </Box>

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
                              <Box className="col-5">
                                <Typography
                                  sx={{
                                    color: "crimson",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleDelete(
                                      index,
                                      item.id,
                                      item.cart_session_id
                                    )
                                  }
                                >
                                  Xóa
                                </Typography>
                              </Box>
                            </Box>
                          );
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
                          <Typography sx={{ textTransform: "capitalize" }}>
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

                          <Box
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
                            onClick={handleOrder}
                          >
                            Đặt hàng
                          </Box>
                        </Box>
                      </Box>
                    </Payment>
                  </Option>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                <Box
                  sx={{
                    height: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ pointerEvents: "none" }}>
                    <img
                      src={PF + "/assets/cart/empty-cart-removebg-preview.png"}
                      alt=""
                      width="270px"
                    />
                  </Box>
                  <Box
                    sx={{
                      pointerEvents: "none",
                      margin: 2,
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#666",
                    }}
                  >
                    Giỏ hàng của bạn còn trống
                  </Box>
                  <Link to="/">
                    <Box
                      sx={{
                        color: "#fff",
                        backgroundColor: "dodgerblue",
                        textTransform: "uppercase",
                        padding: "10px 30px",
                        borderRadius: "5px",
                      }}
                    >
                      Mua ngay
                    </Box>
                  </Link>
                </Box>
              </Fragment>
            )
          ) : (
            <Box
              sx={{
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CircularProgress />
              <Box
                sx={{
                  pointerEvents: "none",
                  margin: 2,
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#666",
                }}
              >
                Đang xử lý...
              </Box>
            </Box>
          )}
        </Container>
      </ContentCart>

      <Footer />
    </Root>
  );
};

export default Cart;

const Payment = styled(Box)(() => ({
  borderRadius: "0 0 5px 5px",
  boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#fff",
  position: "sticky",
  bottom: 0,
  zIndex: 2,
}));

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
}));

const ContentCart = styled(Box)(() => ({
  paddingBottom: 4,
}));

const Root = styled(Box)(() => ({
  position: "relative",
}));

export const HeaderCart = () => {
  return (
    <Box
      className="header-cart"
      sx={{ boxShadow: "0 1px 0 rgba(0, 0, 0, 0.125)" }}
    >
      <TopBar />

      <Bottom sx={{ backgroundColor: "#fff", padding: "30px 0" }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Brand />
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  margin: "auto 20px",
                  height: "30px",
                  borderWidth: "1px",
                  borderColor: "var(--color-main)",
                }}
              />
              <Typography
                sx={{
                  color: "var(--color-main)",
                  fontSize: "24px",
                }}
              >
                Giỏ hàng
              </Typography>
            </Box>

            <Search />

            <AccountMenu />
          </Box>
        </Container>
      </Bottom>
    </Box>
  );
};

const Bottom = styled(Box)(() => ({}));

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
