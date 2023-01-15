import { Button, styled } from "@mui/material";
import React from "react";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { StyledBadge } from "../components/StyledBagde";

const ButtonCartWrapper = styled(Button)(() => ({
  color: "var(--color-main)",
}));

const ButtonCard = () => {
  return (
    <ButtonCartWrapper>
      <StyledBadge badgeContent={1} color="error">
        <ShoppingCartIcon />
      </StyledBadge>
    </ButtonCartWrapper>
  );
};

export default ButtonCard;
