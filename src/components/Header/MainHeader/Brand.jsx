import { Box, Link } from "@mui/material";
import React from "react";

const Brand = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Box
      sx={{
        width: "250px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="#">
        <img
          src={PF + "assets/logo/TECH.png"}
          alt="logo"
          style={{ width: "100%" }}
        />
      </Link>
    </Box>
  );
};

export default Brand;
