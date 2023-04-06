import "./style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ResponseRating from "./ResponseRating";
import React, { useEffect, useState } from "react";
import { formatDiscount, formatPrice, formatVND } from "~/helper/format";
import { Box, Button, Grid, Rating, styled, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Slider from "react-slick";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";
import { showLoginForm } from "~/redux/ModalContainer/ModalContainerAction";
import ModalContainer from "~/containers/ModalContainer";

export default function ProductDetails() {
  const [fetch, setFetch] = useState(null);
  const [isAddCart, setAddCart] = useState(false);
  const nameProduct = useParams().nameProduct;
  const currentUser = useSelector(selectorCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "post",
        url: "/client/pageProduct/product",
        data: {
          nameProduct,
          user_id: currentUser.isLogged ? currentUser?.user?.data?.id : null,
        },
      });

      setAddCart(response.data.isAddCart);
      setFetch(response.data);
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
      await axios({
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
                <Button
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
