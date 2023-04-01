import {
  formatCost,
  formatDiscount,
  formatPrice,
  formatVND,
} from "~/helper/format";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Brand, Search } from "~/components/Header";
import AccountMenu from "~/components/Header/AccountMenu";
import { Footer } from "~/components";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";

const Cart = () => {
  const [fetch, setFetch] = useState([]);
  const currentUser = useSelector(selectorCurrentUser);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "post",
        url: "/client/cart",
        data: {
          user_id: currentUser.isLogged ? currentUser.user.data.id : null,
        },
      });

      setFetch(response.data);
    };

    fetch();
  }, [currentUser]);

  console.log("fetch", fetch);

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
      await axios({
        method: "post",
        url: "/client/cart/increase",
        data: {
          product_id,
          cart_session_id,
        },
      });
    };

    fetch();
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
      await axios({
        method: "post",
        url: "/client/cart/decrease",
        data: {
          product_id,
          cart_session_id,
        },
      });
    };

    fetch();
  };

  const handleDelete = (index, product_id, cart_session_id) => {
    document.querySelector(`.cart-item-${index}`).remove();

    // Request to server delete item
    const fetch = async () => {
      await axios({
        method: "delete",
        url: "/client/cart/delete",
        data: {
          product_id,
          cart_session_id,
        },
      });
    };

    fetch();
  };

  return (
    <Root>
      <HeaderCart>
        <Top>
          <Container maxWidth="lg" disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box className="left">
                <Link>
                  <Typography>Kênh thương hiệu</Typography>
                </Link>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Link>
                  <Typography>Tải ứng dụng</Typography>
                </Link>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography>Kết nối</Typography>
                  <Link
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FacebookOutlinedIcon />
                  </Link>
                  <Link
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <InstagramIcon />
                  </Link>
                </Box>
              </Box>

              <Box className="right">
                <Box className="item">
                  <NotificationsOutlinedIcon />
                  <Typography>Thông báo</Typography>
                </Box>
                <Box className="item">
                  <HelpOutlineOutlinedIcon />
                  <Typography>Hỗ trợ</Typography>
                </Box>
                <Box className="item">
                  <LanguageOutlinedIcon />
                  <Typography>Tiếng việt</Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Top>

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
      </HeaderCart>

      <ContentCart>
        <Container maxWidth="lg" disableGutters>
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
                {fetch.data &&
                  fetch.data.map((item, index) => {
                    return (
                      <Box
                        className={`item col cart-item-${index}`}
                        key={index}
                      >
                        {/* CheckBox */}
                        <Box className="col-0">
                          <Checkbox />
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
                            <Box className="count">{item.quantity}</Box>
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
                                  ((item.discount ? item.discount : 0) / 100)) *
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
                              handleDelete(index, item.id, item.cart_session_id)
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
                      Chọn tất cả (1)
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
                      Tổng thanh toán (0 sản phẩm):{" "}
                      <Typography
                        variant="span"
                        sx={{
                          color: "crimson",
                          fontWeight: 600,
                          fontSize: "1.2rem",
                        }}
                      >
                        {formatVND(30000000)}
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
                    >
                      Mua ngay
                    </Box>
                  </Box>
                </Box>
              </Payment>
            </Option>
          </Box>
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

const HeaderCart = styled(Box)(() => ({
  boxShadow: "0 1px 0 rgba(0, 0, 0, 0.125)",
}));

const Top = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  backgroundColor: "var(--color-main)",

  "p, a": {
    fontSize: "14px",
    color: "#fff",
  },

  svg: {
    color: "#fff",
    fontSize: "18px",
    margin: "0 3px",
  },

  a: {
    ":hover": {
      "p, svg": {
        color: "#c1c1c1",
      },
    },
  },

  hr: {
    height: "12px",
    margin: "auto 10px",
    borderColor: "#fff",
  },

  ".left": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  ".right": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    ".item": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 7px",
      textTransform: "capitalize",
      cursor: "pointer",
    },
  },
}));

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
