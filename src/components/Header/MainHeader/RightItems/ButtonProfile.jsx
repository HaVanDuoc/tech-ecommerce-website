import { Button, styled, Typography } from "@mui/material";
import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const ButtonProfileWrapper = styled(Button)(({ theme }) => ({}));

const ButtonProfile = () => {
  return (
    <ButtonProfileWrapper
      sx={{
        color: "var(--color-secondary)",
      }}
    >
      <Typography textTransform="none">Đăng nhập</Typography>
      <SentimentSatisfiedAltIcon sx={{ marginLeft: 1 }} />
    </ButtonProfileWrapper>
  );
};

export default ButtonProfile;
