import { Box } from "@mui/material";
import React, { Fragment } from "react";
import ListProduct from "~/components/page/ContentProductPage";
import ShowBrand from "~/components/page/ShowBrand";
import { Banner } from "~/pages/Home";

const Fridge = () => {
  const page = "Tủ lạnh";

  return (
    <Box>
      <Banner />
      <ShowBrand currentPage={page} />
      <ListProduct />
    </Box>
  );
};

export default Fridge;
