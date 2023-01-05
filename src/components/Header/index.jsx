import React from "react";
import "./Header.scss";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  IconButton,
  Menu,
  Stack,
  styled,
  Toolbar,
} from "@mui/material";
import Brand from "./Brand";
import SearchNavbar from "./SearchNavbar";
import RightNavbar from "./RightNavbar";
import MenuIcon from "@mui/icons-material/Menu";
import { NavProductData } from "./Data";
import NavProduct from "./NavPoduct";

const Navbar = styled(AppBar)(({ theme }) => ({
  padding: "10px 0",
  backgroundColor: "white",
  color: theme.palette.primary.main,
  boxShadow: "none",
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "100vw",
    top: "84px !important",
    left: "0px !important",
    backgroundColor: theme.palette.primary.main,
    // minHeight: "calc(100vh - 84px)",
  },
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  height: "auto",
  flexDirection: "column",
  backgroundColor: theme.palette.primary.main,

  "& button":{
    maxWidth: "none !important",
    padding: "10px"
  }
}));

const Header = () => {
  const [toggleNav, setToggleNav] = React.useState(null);
  const open = Boolean(toggleNav);

  const handleOpenNav = (e) => {
    setToggleNav(e.currentTarget);
  };

  const handleCloseNav = (e) => {
    setToggleNav(null);
  };

  return (
    <React.Fragment>
      <Navbar position="static" enableColorOnDark>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ width: "100%" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexGrow="1"
            >
              <IconButton
                id="menu-button"
                aria-controls={open ? "menu-navbar" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                onClick={handleOpenNav}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Brand />
              <SearchNavbar />
              <RightNavbar />
            </Stack>
          </Toolbar>
        </Container>
      </Navbar>

      <NavProduct />

      <StyledMenu
        id="menu-navbar"
        anchorEl={toggleNav}
        open={open}
        onClose={handleCloseNav}
      >
        <StyledBottomNavigation
          showLabels
          sx={{ height: "auto", flexDirection: "column" }}
        >
          {NavProductData
            .filter((productList) => productList.menuNavbarProduct)
            .map((item, index) => (
              <BottomNavigationAction
                key={index}
                label={item.name}
                icon={item.icon}
              />
            ))}
        </StyledBottomNavigation>
      </StyledMenu>
    </React.Fragment>
  );
};

export default Header;
