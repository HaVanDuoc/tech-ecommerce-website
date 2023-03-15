import { Box } from "@mui/material";
import React from "react";
import ListProduct from "~/components/page/ContentProductPage";
import Nav from "~/components/Nav";
import Banner from "../Home_v3/Banner";
import ShowBrand from "~/components/page/ShowBrand";
import { currentPage } from "~/components/constant";

const Mobile = () => {
  const page = currentPage.DIENTHOAI;

  return (
    <Box>
      <Nav />
      <Banner />
      <ShowBrand currentPage={page} />
      <ListProduct />
    </Box>
  );
};

export default Mobile;
