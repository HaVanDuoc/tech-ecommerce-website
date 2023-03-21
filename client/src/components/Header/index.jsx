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
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ModalContainer from "~/containers/ModalContainer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { showLoginForm } from "~/redux/ModalContainer/ModalContainerAction";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

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

      <Nav />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled(Box)(() => ({
  backgroundColor: "#fff",
}));

export const Nav = () => {
  const [nav, setNav] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios("/client/header/nav");
      setNav(response.data.data);
    };

    fetch();
  }, []);

  const Styled = styled(Box)(() => ({
    backgroundColor: "var(--color-main)",
    boxShadow: "0 1px 6px 0 rgba(32,33,36,.28)",

    ".slick-slider": {
      width: "100%",
    },

    ".slick-slider button": {
      width: "20px",
      height: "20px",
    },

    "button.slick-prev:before, button.slick-next:before": {
      fontSize: "20px",
      color: "var(--color-main)",
    },

    ".slick-prev.slick-disabled:before, .slick-next.slick-disabled:before": {
      opacity: 0,
    },
  }));

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
  };

  return (
    <Styled>
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50px",
          }}
        >
          <Slider {...settings}>
            {Array.isArray(nav) &&
              nav.length > 0 &&
              nav.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{ paddingLeft: "10px", paddingRight: "10px" }}
                  >
                    <Link
                      to={item?.link}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        display="flex"
                        flexWrap="nowrap"
                        color="#fff"
                        textTransform="uppercase"
                        fontWeight={500}
                        justifyContent="center"
                      >
                        {item?.name}
                      </Typography>
                    </Link>
                  </Box>
                );
              })}
          </Slider>
        </Box>
      </Container>
    </Styled>
  );
};

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
