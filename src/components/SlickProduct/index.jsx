import { styled } from "@mui/material";
import React from "react";
import Slider from "react-slick";

// React-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardProduct } from "~/components";

const StyledSlick = styled("div")(({ theme }) => ({
  // "& :hover": {
  //   "& .slick-arrow": {
  //     display: "block !important",
  //   },

  //   "& .slick-prev": {
  //     left: "-50px",
  //   },
  //   "& .slick-next": {
  //     right: "-50px",
  //   },
  // },

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

    // "& #text": {
    //   boxShadow:
    //     " 0 3.2px 3.2px rgb(0 0 0 / 25%), 4.8px 0 3.2px rgb(0 0 0 / 5%)",
    // },
  },
}));

// const PrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// };

// const NextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// };

const SlickProduct = () => {
  const options = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
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
