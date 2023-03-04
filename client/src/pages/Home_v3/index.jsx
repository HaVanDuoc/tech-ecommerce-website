import { Box, styled } from "@mui/material";
import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import { Wrap } from "./StyledHome";

const WrapHome = styled(Box)(() => ({}));

const Home = () => {
  return (
    <WrapHome>
      <Banner />
      <Wrap>
        <Categories />
      </Wrap>
    </WrapHome>
  );
};

export default Home;
