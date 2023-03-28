import {
  Avatar,
  Badge,
  Box,
  Button,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";
import { showLoginForm } from "~/redux/ModalContainer/ModalContainerAction";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ModalContainer from "~/containers/ModalContainer";

const AccountMenu = () => {
  const currentUser = useSelector(selectorCurrentUser);
  const dispatch = useDispatch();

  return (
    <Box className="account-menu">
      {currentUser.isLogged ? (
        //
        //   Đã đăng nhập
        //
        <Stack
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            cursor: "pointer",
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src={currentUser.user.data.avatar} />
          </StyledBadge>
        </Stack>
      ) : (
        //
        // chưa đăng nhập
        //
        <ModalContainer>
          <Button
            onClick={() => dispatch(showLoginForm())}
            sx={{
              color: "var(--color-secondary)",
            }}
          >
            <Typography textTransform="none">Đăng nhập</Typography>
            <SentimentSatisfiedAltIcon sx={{ marginLeft: 1 }} />
          </Button>
        </ModalContainer>
      )}
    </Box>
  );
};

export default AccountMenu;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
