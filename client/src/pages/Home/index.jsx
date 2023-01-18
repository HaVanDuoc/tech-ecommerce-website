import { Box, styled } from "@mui/material";
import React from "react";
import BannerHome from "./BannerHome";
import DealNgonMoiNgay from "./DealNgonMoiNgay";
import DienThoaiDocQuyen from "./DienThoaiDocQuyen";
import SanPhamNoiBac from "./SanPhamNoiBac";
import DanhMucNoiBac from "./DanhMucNoiBat";
import { Footer } from "~/components";

const StyledHome = styled(Box)(({ theme }) => ({}));

const Home = () => {
  return (
    <StyledHome>
      <BannerHome />
      <SanPhamNoiBac />
      <DealNgonMoiNgay />
      <DienThoaiDocQuyen />
      <DanhMucNoiBac />
      <Footer />
    </StyledHome>
  );
};

export default Home;
