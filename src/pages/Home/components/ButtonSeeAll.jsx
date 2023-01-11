import { Box, Button, styled } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Styled = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ButtonSeeAll = () => {
  return (
    <Styled>
      <Button
        variant="outlined"
        sx={{
          padding: "10px 80px",
          borderColor: "var(--color-text)",
        }}
      >
        Xem tất cả sản phẩm <KeyboardArrowRightIcon />
      </Button>
    </Styled>
  );
};

export default ButtonSeeAll;
