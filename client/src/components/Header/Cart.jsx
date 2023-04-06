import { Badge, Button, Stack, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";

const Cart = () => {
  const currentUser = useSelector(selectorCurrentUser);

  console.log("currentUser", currentUser);

  return (
    <Stack justifyContent="center" alignItems="center">
      <Link to="/cart">
        <Button sx={{ color: "var(--color-main)" }}>
          <StyledBadge
            badgeContent={
              currentUser.isLogged ? currentUser.user.countProductInCart : 0
            }
            color="error"
          >
            <ShoppingCartIcon />
          </StyledBadge>
        </Button>
      </Link>
    </Stack>
  );
};

export default Cart;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
