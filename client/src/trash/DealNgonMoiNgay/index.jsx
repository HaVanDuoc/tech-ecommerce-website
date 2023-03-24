import { Box, Container, styled } from "@mui/material";
import React from "react";
import { SlickProduct } from "~/components";
import ButtonSeeAll from "../components/ButtonSeeAll";
import TitleHome from "../components/TitlePrimary";

const StyledDealNgonMoiNgay = styled(Box)(({ theme }) => ({
  margin: "40px auto",
}));

const DealNgonMoiNgay = () => {
  return (
    <StyledDealNgonMoiNgay>
      <Container maxWidth="lg" disableGutters>
        <TitleHome>Deal ngon mỗi ngày</TitleHome>
        <SlickProduct />
        <ButtonSeeAll />
      </Container>
    </StyledDealNgonMoiNgay>
  );
};

export default DealNgonMoiNgay;
