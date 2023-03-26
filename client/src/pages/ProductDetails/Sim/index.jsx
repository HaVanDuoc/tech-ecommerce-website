import { Box } from "@mui/material";
import React from "react";
import ListProduct from "~/components/page/ContentProductPage";
import ShowBrand from "~/components/page/ShowBrand";
import { Banner } from "~/pages/Home";

const Sim = () => {
  const page = "Sim";

  return (
    <Box>
      <Banner />
      <ShowBrand currentPage={page} />
      <ListProduct />
    </Box>
  );
};

export default Sim;
