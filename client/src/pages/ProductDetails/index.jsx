import "./style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ResponseRating from "./ResponseRating";
import React, { useEffect, useState } from "react";
import { formatDiscount, formatPrice, formatVND } from "~/helper/format";
import { Box, Button, Grid, Rating, styled, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function ProductDetails() {
  const [fetch, setFetch] = useState(null);
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]); // Image is selected to show
  const nameProduct = useParams().productName;

  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "post",
        url: "/client/pageProduct/product",
        data: { nameProduct },
      });

      setFetch(response.data.data);

      // set data image list to state `images`
      // because the original data is form string
      // so that use JSON.parse convert data back to array
      setImages(JSON.parse(response.data.data.image));

      setSelected(JSON.parse(response.data.data.image)[0]);
    };

    fetch();
  }, [nameProduct]);

  const handleClick = (index) => {
    setSelected(images[index]);
  };

  return (
    <Section>
      {/* Information Product */}
      <Grid container>
        {/* left */}
        <Grid item xs={6}>
          <Box className="left">
            <Box className="mainImage">
              <img
                // src={PF + "/assets/products/" + selected.src}
                src={selected?.base64}
                alt={selected?.alt}
                className="slide"
              />
            </Box>
          </Box>
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
              {fetch?.category}
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
              {fetch?.name}
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
              <Typography
                sx={{
                  fontFamily: "'Antic Slab', serif",
                  fontSize: 23,
                  fontWeight: 400,
                  color: "#000",
                  textDecorationLine: "line-through",
                }}
              >
                {formatVND(fetch?.price)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Antic Slab', serif",
                  fontSize: 40,
                  fontWeight: 500,
                  color: "crimson",
                }}
              >
                {formatVND(formatPrice(fetch?.price, fetch?.discount))}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Antic Slab', serif",
                  fontSize: 23,
                  fontWeight: 500,
                  color: "crimson",
                }}
              >
                {formatDiscount(fetch?.discount)}
              </Typography>
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
                "& :nth-child(n)": {
                  marginLeft: 1,
                  marginRight: 1,
                },
              }}
            >
              {/* Button Add Cart */}
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
              >
                <ShoppingCartOutlinedIcon />
                <Typography>Thêm vào giỏ hàng</Typography>

                {/* <AssignmentTurnedInOutlinedIcon/>
                <Typography>Đã có trong giỏ hàng</Typography> */}
              </Button>

              {/* Button Order */}
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
            </Box>
          </Box>
        </Grid>

        {/* Option Image */}
        <Grid item xs={12}>
          <Grid className="optionImage">
            {images.length > 0 &&
              images.map((image, index) => {
                return (
                  <img
                    src={image.base64}
                    alt={image.fileName}
                    key={index}
                    style={
                      image.fileName === selected.fileName
                        ? {
                            border: "3px solid dodgerblue",
                            opacity: 1,
                          }
                        : {
                            border: "3px solid transparent",
                            opacity: 0.5,
                          }
                    }
                    onClick={() => handleClick(index)}
                  />
                );
              })}
          </Grid>
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
    // width: "100%",
    height: "100%",
  },

  ".optionImage": {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
