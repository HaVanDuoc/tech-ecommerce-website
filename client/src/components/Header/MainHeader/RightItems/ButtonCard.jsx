import { Button, styled } from "@mui/material";
import React from "react";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { StyledBadge } from "../components/StyledBagde";
import { Link } from "react-router-dom";

const ButtonCartWrapper = styled(Button)(() => ({
  color: "var(--color-main)",
}));

const ButtonCard = () => {
  return (
    <Link to="/cart">
      <ButtonCartWrapper>
        <StyledBadge badgeContent={1} color="error">
          <ShoppingCartIcon />
        </StyledBadge>
      </ButtonCartWrapper>
    </Link>
  );
};

export default ButtonCard;
