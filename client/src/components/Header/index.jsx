import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputBase,
  Popover,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { formatVND } from "~/helper/format";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AccountMenu from "./AccountMenu";
import Notification from "./Notification";

const Header = () => {
  return (
    <Wrapper>
      {/* <TopBar /> */}

      <AppBar />

      <Nav />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled(Box)(() => ({
  backgroundColor: "#fff",
  boxShadow: "1px 1px 5px 2px rgba(0, 0, 0, 0.25)",
}));

export const AppBar = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ padding: "24px 0" }}>
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
              <Notification />

              {/* Cart */}
              <Stack justifyContent="center" alignItems="center">
                <Link to="/cart">
                  <Button sx={{ color: "var(--color-main)" }}>
                    <StyledBadge badgeContent={1} color="error">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </Button>
                </Link>
              </Stack>
              {/*  */}

              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ mx: 1, borderWidth: "1px", borderColor: "#ccc" }}
              />

              {/* User */}
              <AccountMenu />

              {/*  */}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

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
    boxShadow: "2px 0 5px 5px rgba(0, 0, 0, 0.05)",

    ".slick-slider": {
      width: "100%",

      ":hover": {
        button: {
          opacity: 1,
        },
      },
    },

    ".slick-slider button": {
      width: "20px",
      height: "20px",
      color: "#fff",
      opacity: 0,
      transition: "all .3s ease-in-out",
    },

    "button.slick-prev:before, button.slick-next:before": {
      fontSize: "20px",
    },

    ".slick-prev.slick-disabled:before, .slick-next.slick-disabled:before": {
      opacity: 0,
    },
  }));

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
          <Slider
            dots={false}
            infinite={false}
            speed={500}
            slidesToShow={8}
            slidesToScroll={8}
          >
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
                        flexWrap="wrap"
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
    boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.25)",

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

export const TopBar = () => {
  const Wrapper = styled(Box)(() => ({
    padding: "5px",
    color: "#666666",

    p: {
      fontSize: "14px",
    },

    svg: {
      fontSize: "18px",
    },

    ".left": {
      ".media": {
        backgroundColor: "#eee",
        margin: "5px",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        cursor: "pointer",

        svg: {
          color: "#666666",
          fontSize: "18px",
          transition: "all .3s ease-in-out",
        },

        ":hover": {
          ".fb": {
            color: "#4867AA",
          },

          ".tw": {
            color: "#1DA1F2",
          },

          ".yt": {
            color: "#ED352D",
          },

          ".in": {
            color: "#8D49C0",
          },
        },
      },
    },

    ".center": {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },

    ".right": {
      ".item": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "16px",
      },
    },
  }));
  return (
    <Container
      maxWidth="xl"
      sx={{ boxShadow: "1px 0 4px 2px rgba(0, 0, 0, 0.05)" }}
    >
      <Wrapper>
        <Grid container>
          <Grid item xs>
            <Stack
              flexDirection="row"
              justifyContent="start"
              alignItems="center"
              className="left"
            >
              <Box className="media">
                <FacebookOutlinedIcon className="fb" />
              </Box>
              <Box className="media">
                <TwitterIcon className="tw" />
              </Box>
              <Box className="media">
                <YouTubeIcon className="yt" />
              </Box>
              <Box className="media">
                <InstagramIcon className="in" />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={5}>
            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              className="center"
            >
              <Typography
                textTransform="uppercase"
                color="#888888"
                fontSize="14px"
                fontWeight={500}
              >
                Miễn phí giao hàng với đơn hàng trên {formatVND(500000)}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs>
            <Stack
              height="100%"
              flexDirection="row"
              justifyContent="end"
              alignItems="center"
              className="right"
            >
              <Box className="item">
                <LocationOnOutlinedIcon />
                <Typography>TP. Hồ Chí Minh</Typography>
              </Box>
              <Box className="item">
                <SupportAgentOutlinedIcon />
                <Typography>Hỗ trợ</Typography>
              </Box>
              <Box className="item">
                <LanguageOutlinedIcon />
                <Typography>Tiếng Việt</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Wrapper>
    </Container>
  );
};
