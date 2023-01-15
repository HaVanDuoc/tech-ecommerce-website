import { Button, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";

const ButtonHome = () => {
  return (
    <Button
    focusVisible
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-main) !important",

        // "& :hover": {
        //   backgroundColor: "var(--background-color-hover)",
        // },
      }}
    >
      <HomeIcon />
      <Typography sx={{textTransform: "none",}}>Trang chủ</Typography>
    </Button>
  );
};

export default ButtonHome;
