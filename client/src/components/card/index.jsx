import { Box, Rating, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { formatCost, formatDiscount, formatPrice } from "~/helper/format";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <Link to={`${product?.linkCategory}/${product?.name}`}>
      <Box
        className="card"
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "350px",
          borderRadius: "5px",
          boxShadow: "0 0 3px 1px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          padding: 3,
          backgroundColor: "#fff",
          cursor: "pointer",
          transition: "all .4s ease-in-out",
          position: "relative",

          ":hover": {
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.2)",

            ".select": {
              transform: "none",
            },

            ".image": {
              transform: "scale(1.1)",
            },

            ".name-product": {
              color: "dodgerblue",
            },
          },

          ".image": {
            maxHeight: 200,
            transform: "none",
            transition: "transform .4s ease-in-out",
          },
        }}
      >
        <Stack flexDirection="column">
          {/* Image */}
          <Box
            sx={{
              minHeight: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={product?.image ? JSON.parse(product?.image)[0].base64 : ""}
              alt=""
              width="100%"
              className="image"
            />
          </Box>

          <Stack flexDirection="column" sx={{ height: 180, zIndex: 2 }}>
            <Typography
              sx={{
                color: "#d51919",
                fontWeight: 500,
                textTransform: "uppercase",
                fontFamily: "'Chakra Petch', sans-serif",
                paddingBottom: 1,
              }}
            >
              {product?.category ? product?.category : ""}
            </Typography>

            <Typography
              className="name-product"
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                paddingBottom: 1,
                fontSize: "17px",
                color: "var(--color-text)",
              }}
            >
              {product?.name ? product?.name : ""}
            </Typography>

            <Stack
              flexDirection="row"
              alignItems="center"
              paddingBottom={1}
              height={35}
            >
              <Rating value={4} readOnly size="small" />
              <Typography
                fontSize={13}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 1,
                  color: "#666",
                }}
              >
                (32)
              </Typography>
            </Stack>

            {/* price */}

            <Stack flexDirection="row" alignItems="center">
              {/* Giá sau trừ giảm giá */}

              {product?.price ? (
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "17px",
                    marginRight: 1,
                    color: "crimson",
                  }}
                >
                  {formatPrice(product.price, product.discount)}
                </Typography>
              ) : (
                <Fragment />
              )}

              {/* Giá gốc cost */}
              {product?.discount && (
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#666",
                  }}
                >
                  {formatCost(product?.price)}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>

        {/* Box select when hover  */}
        <Box
          className="select"
          sx={{
            position: "absolute",
            top: "30px",
            right: 0,
            transform: "translateX(100%)",
            transition: "all .4s ease-in-out",

            ".item": {
              borderRadius: "5px 0 0 5px",
              borderTop: "1px solid #ddd",
              borderLeft: "1px solid #ddd",
              borderBottom: "1px solid #ddd",
              padding: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0,1)",

              svg: {
                color: "#555",
              },

              ":hover": {
                svg: {
                  color: "dodgerblue",
                },
              },
            },
          }}
        >
          <Stack flexDirection="column" spacing={1}>
            <Box className="item">
              <FavoriteBorderOutlinedIcon />
            </Box>
            <Box className="item">
              <RemoveRedEyeOutlinedIcon />
            </Box>
            <Box className="item">
              <LocalMallOutlinedIcon />
            </Box>
          </Stack>
        </Box>

        {/* Box discount */}
        {product?.discount && (
          <Box
            sx={{
              position: "absolute",
              top: "20px",
              left: "20px",
              backgroundColor: "#ffc300",
              color: "#000",
              padding: "3px 10px",
              borderRadius: "15px",
            }}
          >
            <Typography fontSize={12} fontWeight={600}>
              {formatDiscount(product?.discount)}
            </Typography>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default Card;
