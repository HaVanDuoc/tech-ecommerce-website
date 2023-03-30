import { Box, styled } from "@mui/material";
import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import FlashSale from "./FlashSale";
import { Wrap } from "./StyledHome";
import TodaySuggestions from "./TodaySuggestions";
import TopFind from "./TopFind";

const WrapHome = styled(Box)(() => ({}));

const Home = () => {
  return (
    <WrapHome>
      <Banner />
      <Wrap>
        <Categories />
        <FlashSale />
        <TopFind />
        <TodaySuggestions />
      </Wrap>
    </WrapHome>
  );
};

export default Home;
