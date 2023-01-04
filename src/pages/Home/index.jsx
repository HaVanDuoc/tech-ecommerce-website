import { Box, styled } from "@mui/material";
import React from "react";
import Banner from "./Banner";
import ProductFocus from "./ProductFocus";

const StyledHome = styled(Box)(({ theme }) => ({}));

const Home = () => {
  return (
    <StyledHome>
      <Banner />
      <ProductFocus />
    </StyledHome>
  );
};

export default Home;
