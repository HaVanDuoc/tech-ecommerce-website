import { Box, styled } from "@mui/material";
import React from "react";
import Banner from "./Banner";
import SanPhamNoiBac from "./SanPhamNoiBac";

const ContentWrapper = styled(Box)(() => ({
  "& >div": {
    marginBottom: "15px",
  },
}));

const Content = () => {
  return (
    <ContentWrapper>
      <Banner />
      <SanPhamNoiBac />
    </ContentWrapper>
  );
};

export default Content;
