import { Box, Grid, styled } from "@mui/material";
import React from "react";
import BannerPrimary from "./BannerPrimary";
import BannerSecondary from "./BannerSecondary";

const BannerWrapper = styled(Box)(() => ({
  // marginBottom: "15px",
}));

const Banner = () => {
  return (
    <BannerWrapper>
      <Grid container spacing={2}>
        <Grid item xs={8.94}>
          <BannerPrimary />
        </Grid>
        <Grid item xs={3.06}>
          <BannerSecondary />
        </Grid>
      </Grid>
    </BannerWrapper>
  );
};

export default Banner;
