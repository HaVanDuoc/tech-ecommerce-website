import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const StyledBoxRightNavbar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  fontWeight: "500",
  textTransform: "uppercase",
  fontSize: "14px",
}));

const RightNavbar = () => {
  return (
    <StyledBoxRightNavbar>
      <Link sx={{ display: { xs: "none", md: "flex" } }}>
        <Typography>Đăng nhập</Typography>
      </Link>

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ color: "var(--color-main)" }}
      />

      <Link
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ display: { xs: "none", md: "flex" } }}>
          Giỏ hàng
        </Typography>
        <LocalMallIcon />
      </Link>
    </StyledBoxRightNavbar>
  );
};

export default RightNavbar;
