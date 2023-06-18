import "./styles.scss";
import { Box, Typography } from "@mui/material";
import React from "react";
// import { default as BannerHome } from "~/trash/Home_v3/Banner";

const Preview = ({ children }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
        Preview
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
};

const Banner = () => {
  return (
    <Box className="editBanner">
      <Preview>
        {/* <BannerHome /> */}
      </Preview>
    </Box>
  );
};

export default Banner;
