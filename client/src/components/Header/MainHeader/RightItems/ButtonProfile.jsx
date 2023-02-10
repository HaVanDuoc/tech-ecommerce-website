import { Button, styled, Typography } from "@mui/material";
import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ModalContainer from "~/containers/ModalContainer";
import { useDispatch } from "react-redux";
import { showLoginForm } from "~/redux/ModalContainer/ModalContainerAction";

const ButtonProfileWrapper = styled(Button)(() => ({}));

const ButtonProfile = () => {
  const dispatch = useDispatch();

  return (
    <ModalContainer>
      <ButtonProfileWrapper
        onClick={() => dispatch(showLoginForm())}
        sx={{
          color: "var(--color-secondary)",
        }}
      >
        <Typography textTransform="none">Đăng nhập</Typography>
        <SentimentSatisfiedAltIcon sx={{ marginLeft: 1 }} />
      </ButtonProfileWrapper>
    </ModalContainer>
  );
};

export default ButtonProfile;
