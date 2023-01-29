import { Button, styled, Typography } from "@mui/material";
import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ModalAuth from "~/components/ModalAuth";

const ButtonProfileWrapper = styled(Button)(() => ({}));

const ButtonProfile = () => {
  return (
    <ModalAuth>
      <ButtonProfileWrapper
        sx={{
          color: "var(--color-secondary)",
        }}
      >
        <Typography textTransform="none">Đăng nhập</Typography>
        <SentimentSatisfiedAltIcon sx={{ marginLeft: 1 }} />
      </ButtonProfileWrapper>
    </ModalAuth>
  );
};

export default ButtonProfile;
