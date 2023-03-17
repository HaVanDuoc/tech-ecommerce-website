import "./style.css";
import { Box, Button, Grid, Rating, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { PF } from "~/__variables";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Section = styled(Box)(() => ({
  backgroundColor: "#fff",

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

const dummyImage = [
  { src: "1.webp", alt: "1" },
  { src: "2.webp", alt: "2" },
  { src: "3.webp", alt: "3" },
  { src: "4.webp", alt: "4" },
  { src: "5.webp", alt: "5" },
];

export default function Product() {
  const [images, setImages] = useState(dummyImage);
  const [selected, setSelected] = useState(dummyImage[0]);

  const handleClick = (index) => {
    setSelected(images[index]);
  };

  return (
    <Section>
      <Grid container>
        {/* left */}
        <Grid item xs={6}>
          <Box className="left">
            <Box className="mainImage">
              <img
                src={PF + "/assets/products/" + selected.src}
                alt={selected.alt}
                className="slide"
              />
            </Box>
          </Box>
        </Grid>

        {/* Right */}
        <Grid item xs={6}>
          <Box className="right">
            <Typography
              sx={{
                fontFamily: "'Saira Condensed', sans-serif",
                textTransform: "uppercase",
                fontSize: 25,
              }}
            >
              Laptop
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Michroma', sans-serif",
                textAlign: "center",
                fontSize: 40,
                marginBottom: 3,
              }}
            >
              Gigabyte AERO 16 XE5 73VN938AH
            </Typography>

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
                3.000.000
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Antic Slab', serif",
                  fontSize: 40,
                  fontWeight: 500,
                  color: "crimson",
                }}
              >
                5.000.000
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Antic Slab', serif",
                  fontSize: 23,
                  fontWeight: 500,
                  color: "crimson",
                }}
              >
                -24%
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

            <Box
              marginTop={6}
              sx={{
                "& :nth-child(n)": {
                  marginLeft: 1,
                  marginRight: 1,
                },
              }}
            >
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
              </Button>

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

        {/* bottom */}
        <Grid item xs={12}>
          <Grid className="optionImage">
            {images.length > 0 &&
              images.map((image, index) => (
                <img
                  src={PF + "/assets/products/" + image.src}
                  alt={image.alt}
                  key={index}
                  style={
                    image.src === selected.src
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
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Section>
  );
}
