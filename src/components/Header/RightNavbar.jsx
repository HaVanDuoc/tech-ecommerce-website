import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const RightNavbar = () => {
  return (
    <Box>
      <Button color="inherit">
        <Typography sx={{ display: { xs: "none", md: "flex" } }}>
          Đăng nhập
        </Typography>
      </Button>
      <IconButton color="inherit" size="large">
        <LocalMallIcon />
      </IconButton>
    </Box>
  );
};

export default RightNavbar;
