import { Typography } from "@mui/material";
import React from "react";

const Brand = () => {
  return (
    <Typography
      variant="h4"
      noWrap
      component="a"
      href="/"
      sx={{
        mr: { xs: 0, md: 2 },
        display: { xs: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      Logo
    </Typography>
  );
};

export default Brand;
