import "./styles.css";
import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";

const Slick = ({ children, settings }) => {
  return (
    <Box>
      <Slider {...settings}>{children}</Slider>
    </Box>
  );
};

export default Slick;
