import "./style.css";
import { useParams } from "react-router-dom";
import ResponseRating from "./ResponseRating";
import React, { useEffect, useState } from "react";
import { formatDiscount, formatPrice, formatVND } from "~/helper/format";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  Rating,
  Slide,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Slider from "react-slick";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";
import { showLoginForm } from "~/redux/ModalContainer/ModalContainerAction";
import ModalContainer from "~/containers/ModalContainer";
import { useSnackbar } from "notistack";
import axiosInstance from "~/utils/axiosInstance";

export default function ProductDetails() {
  const [fetch, setFetch] = useState(null);
  const [refetch, setRefetch] = useState(true);
  const [isAddCart, setAddCart] = useState(false);
  const nameProduct = useParams().nameProduct;
  const currentUser = useSelector(selectorCurrentUser);
  const [open, setOpen] = React.useState(false);
  const [payment, setPayment] = useState(null); // số tiền thanh toán
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0); // Set position for scroll when access page

    const fetch = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/client/pageProduct/product",
        data: {
          nameProduct,
          user_id: currentUser.isLogged ? currentUser?.user?.data?.id : null,
        },
      });

      setAddCart(response.data.isAddCart);
      setFetch(response.data);
      setPayment(
        Number(response.data.data.price) -
          Number(response.data.data.price) *
            ((Number(response.data.data.discount)
              ? Number(response.data.data.discount)
              : 0) /
              100)
      );
    };

    fetch();
  }, [nameProduct, currentUser]);

  console.log("fetch", fetch);

  const handleAddCart = (product_id) => {
    if (currentUser.isLogged === false) {
      dispatch(showLoginForm());
    }

    const user_id = currentUser && currentUser?.user?.data?.id;
    const fetch = async () => {
      await axiosInstance({
        method: "post",
        url: "/client/productDetails/addCart",
        data: {
          user_id,
          product_id,
        },
      });

      setAddCart(!isAddCart);
    };

    if (currentUser.isLogged) return fetch();

    setRefetch(!refetch);
  };

  const MainImage = () => {
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    return (
      <Box
        position="relative"
        // height="700px"
        sx={{
          ".main-slider": {
            ".slick-slide > div": {
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            },
          },

          ".option-slider": {
            ".slick-slide": {
              padding: "8px",
            },

            ".slick-slide > div": {
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            },

            ".slick-current": {
              border: "3px solid dodgerblue",
            },

            "& img": {
              display: "flex !important",
              // width: "auto !important",
              height: "80px",
            },
          },
        }}
      >
        <Box
          sx={{
            // position: "relative",
            height: "480px",
            maxHeight: "480px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              // height: "100%",
            }}
          >
            <Slider
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
              arrows={false}
              infinite={true}
              className="main-slider"
            >
              {fetch?.data &&
                JSON.parse(fetch?.data?.image).map((item, index) => {
                  return (
                    <img src={item?.base64} alt={item?.fileName} key={index} />
                  );
                })}
            </Slider>
          </Box>
        </Box>

        <Box
          sx={{
            transform: "translate(50%, 0)",
          }}
        >
          <Slider
            arrows={false}
            asNavFor={nav1}
            ref={(slider2) => setNav2(slider2)}
            slidesToShow={5}
            swipeToSlide={true}
            focusOnSelect={true}
            infinite={true}
            autoplay={true}
            autoplaySpeed={3000}
            className="option-slider"
          >
            {fetch?.data &&
              JSON.parse(fetch?.data?.image).map((item, index) => {
                return (
                  <img src={item?.base64} alt={item?.fileName} key={index} />
                );
              })}
          </Slider>
        </Box>
      </Box>
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrder = () => {
    let order = [];

    const user_id = currentUser.user.data.id;

    const cart_sessions_id = currentUser.user.data.cart_sessions_id;

    const product_id = fetch?.data?.id;

    const quantity = document.querySelector(`.get-quantity`).innerHTML;

    const totalPayment = payment;

    order.push({
      user_id,
      product_id,
      quantity,
      totalPayment,
      cart_sessions_id,
    });

    const fetchOrder = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/client/cart/order",
        data: order,
      });

      handleSnackBar(response); // xuất thông báo

      handleClose();
    };

    fetchOrder();
  };

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

  return (
    <Section>
      {/* Information Product */}
      <Grid container>
        {/* left */}
        <Grid item xs={6}>
          <MainImage />
        </Grid>

        {/* Right */}
        <Grid item xs={6}>
          <Box className="right">
            {/* Category product */}
            <Typography
              sx={{
                fontFamily: "'Saira Condensed', sans-serif",
                textTransform: "uppercase",
                fontSize: 25,
              }}
            >
              {fetch?.data?.category}
            </Typography>

            {/* Name product */}
            <Typography
              sx={{
                fontFamily: "'Michroma', sans-serif",
                textAlign: "center",
                fontSize: 40,
                marginBottom: 3,
              }}
            >
              {fetch?.data?.name}
            </Typography>

            {/* Price */}
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                "& :nth-child(n)": {
                  marginLeft: 1,
                  marginRight: 1,
                },
              }}
            >
              {fetch?.data?.discount > 0 && (
                <Typography
                  sx={{
                    fontFamily: "'Antic Slab', serif",
                    fontSize: 23,
                    fontWeight: 400,
                    color: "#000",
                    textDecorationLine: "line-through",
                  }}
                >
                  {formatVND(fetch?.data?.price)}
                </Typography>
              )}

              <Typography
                sx={{
                  fontFamily: "'Antic Slab', serif",
                  fontSize: 40,
                  fontWeight: 500,
                  color: "crimson",
                }}
              >
                {formatPrice(fetch?.data?.price, fetch?.data?.discount)}
              </Typography>

              {fetch?.data?.discount && (
                <Typography
                  sx={{
                    fontFamily: "'Antic Slab', serif",
                    fontSize: 23,
                    fontWeight: 500,
                    color: "crimson",
                  }}
                >
                  {formatDiscount(fetch.data?.discount)}
                </Typography>
              )}
            </Box>

            {/* Rating */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Typography
                sx={{ fontWeight: 500, textDecorationLine: "underline" }}
              >
                4.0
              </Typography>
              <Rating
                name="read-only"
                value={4}
                readOnly
                sx={{ marginLeft: 1, marginRight: 1 }}
              />
              <Typography sx={{ fontStyle: "italic" }}>
                {"(320 đánh giá)"}
              </Typography>
            </Box>

            {/* 2 Button */}
            <Box
              marginTop={6}
              sx={{
                display: "flex",

                "& :nth-child(n)": {
                  marginLeft: 1,
                  marginRight: 1,
                },
              }}
            >
              {/* Button Add Cart */}
              {isAddCart ? (
                <Button
                  sx={{
                    padding: "15px 20px",
                    backgroundColor: "#4dd024",
                    color: "#fff",
                    border: "2px solid transparent",

                    "&:hover": {
                      color: "#4dd024 !important",
                      borderColor: "#4dd024 !important",
                      backgroundColor: "#fff !important",
                    },
                  }}
                  onClick={() => handleAddCart(fetch?.data?.id)}
                >
                  <AddShoppingCartOutlinedIcon />
                  <Typography>Đã có trong giỏ hàng</Typography>
                </Button>
              ) : (
                <ModalContainer>
                  <Button
                    sx={{
                      padding: "15px 20px",
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      border: "2px solid transparent",

                      "&:hover": {
                        color: "#1976d2 !important",
                        borderColor: "#1976d2 !important",
                        backgroundColor: "#fff !important",
                      },
                    }}
                    onClick={() => handleAddCart(fetch?.data?.id)}
                  >
                    <ShoppingCartOutlinedIcon />
                    <Typography>Thêm vào giỏ hàng</Typography>
                  </Button>
                </ModalContainer>
              )}

              {/* Button Order */}
              {!isAddCart && (
                <Box>
                  <Button
                    onClick={handleClickOpen}
                    sx={{
                      padding: "15px 20px",
                      backgroundColor: "crimson",
                      color: "#fff",
                      border: "2px solid transparent",

                      "&:hover": {
                        color: "crimson !important",
                        borderColor: "crimson !important",
                        backgroundColor: "#fff !important",
                      },
                    }}
                  >
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
                      <Typography
                        sx={{
                          fontFamily: "'Saira Condensed', sans-serif",
                          textTransform: "uppercase",
                          fontSize: 20,
                          textAlign: "center",
                        }}
                      >
                        {fetch?.data?.category}
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily: "'Michroma', sans-serif",
                          textAlign: "center",
                          fontSize: 25,
                          marginBottom: 3,
                        }}
                      >
                        {fetch?.data?.name}
                      </Typography>

                      <Box
                        sx={{
                          ".slick-slide > div": {
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                          },

                          "& img": {
                            maxWidth: "350px",
                          },
                        }}
                      >
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
                          {fetch?.data &&
                            JSON.parse(fetch?.data?.image).map(
                              (item, index) => {
                                return (
                                  <img
                                    src={item?.base64}
                                    alt={item?.fileName}
                                    key={index}
                                  />
                                );
                              }
                            )}
                        </Slider>
                      </Box>

                      {/* content */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        {/* price */}
                        <Box sx={{ width: "400px" }}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              "& :nth-child(n)": {
                                marginLeft: 1,
                                marginRight: 1,
                              },
                            }}
                          >
                            {fetch?.data?.discount > 0 && (
                              <Typography
                                sx={{
                                  fontFamily: "'Antic Slab', serif",
                                  fontSize: 23,
                                  fontWeight: 400,
                                  color: "#000",
                                  textDecorationLine: "line-through",
                                }}
                              >
                                {formatVND(fetch?.data?.price)}
                              </Typography>
                            )}

                            <Typography
                              sx={{
                                fontFamily: "'Antic Slab', serif",
                                fontSize: 40,
                                fontWeight: 500,
                                color: "crimson",
                              }}
                            >
                              {formatPrice(
                                fetch?.data?.price,
                                fetch?.data?.discount
                              )}
                            </Typography>

                            {fetch?.data?.discount && (
                              <Typography
                                sx={{
                                  fontFamily: "'Antic Slab', serif",
                                  fontSize: 23,
                                  fontWeight: 500,
                                  color: "crimson",
                                }}
                              >
                                {formatDiscount(fetch.data?.discount)}
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        <Stack width="100%">
                          <Divider />
                          <Stack
                            width="100%"
                            flexDirection="row"
                            justifyContent="start"
                            alignItems="center"
                            margin="10px 0"
                          >
                            <Box sx={{ width: "30%" }}>Số lượng</Box>
                            <Box>
                              <BoxCount
                                payment={payment}
                                setPayment={setPayment}
                                price={fetch?.data?.price}
                                discount={fetch?.data?.discount}
                              />
                            </Box>
                          </Stack>
                          <Stack
                            width="100%"
                            flexDirection="row"
                            justifyContent="start"
                            alignItems="center"
                            margin="10px 0"
                          >
                            <Box sx={{ width: "30%" }}>Màu sắc</Box>
                            <Stack flexDirection="row">
                              <Box
                                sx={{
                                  display: "flex",
                                  width: 25,
                                  height: 25,
                                  backgroundColor: "red",
                                  borderRadius: "50%",
                                  marginRight: 1,
                                }}
                              ></Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  width: 25,
                                  height: 25,
                                  backgroundColor: "black",
                                  borderRadius: "50%",
                                  marginRight: 1,
                                }}
                              ></Box>
                            </Stack>
                          </Stack>
                          <Divider />

                          <Stack
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="end"
                            sx={{
                              margin: "8px 0",
                            }}
                          >
                            <Typography color="#666" marginRight={1}>
                              Tổng thanh toán:
                            </Typography>
                            <Typography
                              color="crimson"
                              fontWeight={500}
                              fontSize={20}
                            >
                              {formatVND(payment)}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Button
                          onClick={handleOrder}
                          sx={{
                            padding: "10px 50px",
                            backgroundColor: "crimson",
                            color: "#fff",
                            border: "2px solid transparent",

                            "&:hover": {
                              borderColor: "#a5112d !important",
                              backgroundColor: "#a5112d !important",
                            },
                          }}
                        >
                          <Typography>Đặt hàng</Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Dialog>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Section Rating */}
      <ResponseRating />
    </Section>
  );
}

const Section = styled(Box)(() => ({
  backgroundColor: "#fff",
  paddingBottom: "50px",

  ".left": {
    width: "100%",
    height: "500px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },

  ".right": {
    width: "100%",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  ".mainImage": {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  img: {
    maxWidth: "500px",
  },

  ".optionImage": {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& img": {
      height: "100%",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BoxCount = ({ payment, setPayment, price, discount }) => {
  const handleDecrease = () => {
    // get value current quantity
    const currentValue =
      document.querySelector(`.box-quantity .count`).innerHTML;

    // if value = 1 then stop
    if (currentValue === "1") return;

    // Increase it by 1 then render
    document.querySelector(`.box-quantity .count`).innerHTML =
      Number(currentValue) - 1;

    setPayment(
      Number(payment) -
        Number(price - price * ((discount ? discount : 0) / 100))
    );
  };

  const handleIncrease = () => {
    // get value current quantity
    const currentValue =
      document.querySelector(`.box-quantity .count`).innerHTML;

    // Increase it by 1 then render
    document.querySelector(`.box-quantity .count`).innerHTML =
      Number(currentValue) + 1;

    setPayment(
      Number(payment) +
        Number(price - price * ((discount ? discount : 0) / 100))
    );
  };

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
  };

  return (
    <Box className={`col-3 box-quantity`}>
      <Box sx={styles}>
        <Box className="btn" onClick={handleDecrease}>
          -
        </Box>
        <Box className={"count get-quantity"}>1</Box>
        <Box className="btn" onClick={handleIncrease}>
          +
        </Box>
      </Box>
    </Box>
  );
};
