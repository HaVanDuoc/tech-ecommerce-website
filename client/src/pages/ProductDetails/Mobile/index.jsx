import { Box } from "@mui/material";
import React from "react";
import ListProduct from "~/components/page/ContentProductPage";
import Banner from "../../Home_v3/Banner";
import ShowBrand from "~/components/page/ShowBrand";

const Mobile = () => {
  const page = "Điện thoại";

  return (
    <Box>
      <ShowBrand currentPage={page} />
      <ListProduct />
    </Box>
  );
};

export default Mobile;
