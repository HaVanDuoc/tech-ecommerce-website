import { Box, Button, Popover, styled, Typography } from "@mui/material";
import React from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { StyledBadge } from "../components/StyledBagde";

const ButtonAlertWrapper = styled(Box)(({ theme }) => ({
  color: "var(--color-main)",
}));

const BoxAlert = styled(Popover)(({ theme }) => ({
  marginTop: "5px",
}));

const NoAlert = () => (
  <Box
    position="relative"
    sx={{
      margin: "50px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <SentimentSatisfiedAltIcon fontSize="large" color="primary" />
    <Typography sx={{ p: 1, fontWeight: "500" }}>
      Không có thông báo nào!
    </Typography>
  </Box>
);

const ButtonAlert = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <ButtonAlertWrapper>
      <Button
        type="button"
        onClick={handleClick}
        sx={
          open
            ? { color: "var(--color-main)" }
            : { color: "var(--color-secondary)" }
        }
      >
        <StyledBadge badgeContent={0} color="error">
          <NotificationsActiveIcon />
        </StyledBadge>
        {/* <Typography textTransform="none" display={open ? "none" : "block"}>
            Thông báo!
          </Typography> */}
      </Button>

      <BoxAlert
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* <Typography sx={{ p: 2 }}>Không có thông báo nào!</Typography> */}
        <NoAlert />
      </BoxAlert>
    </ButtonAlertWrapper>
  );
};

export default ButtonAlert;
