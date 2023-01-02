import "./ProductFocus.scss";
import React from "react";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Box } from "@mui/material";
import { CardProduct } from "~/components";

const CarouselProduct = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Box id="carouselProductFocus">
      <ReactOwlCarousel items={5} loop nav >
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
