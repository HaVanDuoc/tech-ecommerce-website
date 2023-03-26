import { Box } from "@mui/material";
import React from "react";
import ListProduct from "~/components/page/ContentProductPage";
import ShowBrand from "~/components/page/ShowBrand";
import { Banner } from "~/pages/Home";

const QuatDieuHoa = () => {
  const page = "Quạt điều hòa";

  return (
    <Box>
      <Banner />
      <ShowBrand currentPage={page} />
      <ListProduct />
    </Box>
  );
};

export default QuatDieuHoa;
