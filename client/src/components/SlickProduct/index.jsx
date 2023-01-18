import { styled } from "@mui/material";
import React from "react";
import Slider from "react-slick";

// React-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardProduct } from "~/components";

const StyledSlick = styled("div")(({ theme }) => ({

  "& .slick-arrow": {
    zIndex: "2",
    width: "auto",
    height: "auto",
    transition: "display .4s ease",
    borderRadius: "50%",
  },

  "& .slick-prev:before, .slick-next:before": {
    fontSize: "50px",
    color: "#403b3b70",
    borderRadius: "50%",
  },
}));

const SlickProduct = () => {
  const options = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <StyledSlick>
      <Slider {...options}>
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </Slider>
    </StyledSlick>
  );
};

export default SlickProduct;
