import "./ProductFocus.scss";
import React from "react";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Box } from "@mui/material";
import { CardProduct } from "~/components";

const CarouselProduct = () => {
  const options = {
    loop: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1050: {
        items: 4,
      },
      1300: {
        items: 5,
      },
    },
  };

  return (
    <Box id="carouselProductFocus">
      <ReactOwlCarousel {...options}>
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </ReactOwlCarousel>
    </Box>
  );
};

export default CarouselProduct;
