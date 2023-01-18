import { Box, Link, styled } from "@mui/material";
import React from "react";
import { PF } from "~/__variables";

const BannerSecondaryWrapper = styled(Box)(() => ({
  borderRadius: "var(--border-radius)",
  overflow: "hidden",

  "& a": {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  "& img": {
    width: "100%",
    height: "100%",
  },
}));

const BannerSecondary = () => {
  const folder = "/assets/banner/";

  return (
    <BannerSecondaryWrapper>
      <Link href="#">
        <img src={PF + folder + "banner-secondary.png"} alt="" />
      </Link>
    </BannerSecondaryWrapper>
  );
};

export default BannerSecondary;
