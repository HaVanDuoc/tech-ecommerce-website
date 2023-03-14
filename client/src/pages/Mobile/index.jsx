import { Box } from "@mui/material";
import React from "react";
import ListProduct from "~/components/ContentProductPage";
import Nav from "~/components/Nav";
import Banner from "../Home_v3/Banner";

const Mobile = () => {
  return (
    <Box>
      <Nav />
      <Banner />
      <ListProduct />
    </Box>
  );
};

export default Mobile;
