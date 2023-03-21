import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  InputBase,
  Popover,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ModalContainer from "~/containers/ModalContainer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { showLoginForm } from "~/redux/ModalContainer/ModalContainerAction";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const Wrapper = styled(Box)(() => ({
  backgroundColor: "#fff",
}));

const Header = () => {
  return (
    <Wrapper>
      <Container maxWidth="xl">
        <Box sx={{ padding: "8px 0" }}>
          <Stack flexDirection="row" alignItems="center" padding={0.5}>
            <Box>
              <Brand />
            </Box>

            <Box flex={1}>
              <Search />
            </Box>

            <Box>
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                {/* Button Home */}
                <Link to="/">
                  <Button
                    focusVisible
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-main) !important",
                    }}
                  >
                    <HomeIcon />
                    <Typography sx={{ textTransform: "none" }}>
                      Trang chủ
                    </Typography>
                  </Button>
                </Link>

                {/* Alert */}
                <Box>
                  <Alert />
                </Box>

                {/* User */}
                <Box>
                  <User />
                </Box>

                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ mx: 1, borderWidth: "1px", borderColor: "#ccc" }}
                />

                {/* Cart */}
                <Link to="/cart">
                  <Button sx={{ color: "var(--color-main)" }}>
                    <StyledBadge badgeContent={1} color="error">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </Button>
                </Link>
                {/*  */}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default Header;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const User = () => {
  const dispatch = useDispatch();

  return (
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
  );
};

export const Alert = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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

  return (
    <Box sx={{ color: "var(--color-main)" }}>
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
      </Button>

      <Popover
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
        sx={{ marginTop: "5px" }}
      >
        <NoAlert />
      </Popover>
    </Box>
  );
};

export const Brand = () => {
  return (
    <Box>
      <Link to="/">
        <Typography
          sx={{
            fontSize: "2em",
            color: "var(--color-main)",
            cursor: "pointer",
          }}
        >
          Tech
        </Typography>
      </Link>
    </Box>
  );
};

export const Search = () => {
  const SearchWrap = styled(Box)(() => ({
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: "var(--border-radius)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    margin: "0 20px",
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.25)",

    "& hr": {
      marginRight: "0 !important",
      color: "#ccc",
    },
  }));

  return (
    <SearchWrap>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40px",
          height: "40px",
          color: "var(--color-secondary)",
        }}
      >
        <SearchIcon />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <InputBase placeholder="Bạn đang tìm gì?" />
      </Box>

      <Button sx={{ textTransform: "none" }}>Tìm kiếm</Button>
    </SearchWrap>
  );
};
