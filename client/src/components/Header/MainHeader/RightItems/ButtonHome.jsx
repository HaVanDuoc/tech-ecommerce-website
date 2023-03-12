import { Button, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const ButtonHome = () => {
  return (
    <Link to="/">
      <Button
        focusVisible
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-main) !important",
        }}
      >
        <HomeIcon />
        <Typography sx={{ textTransform: "none" }}>Trang chủ</Typography>
      </Button>
    </Link>
  );
};

export default ButtonHome;
