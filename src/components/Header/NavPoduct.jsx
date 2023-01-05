import React from "react";
import { NavProductData } from "./Data";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  styled,
} from "@mui/material";
import { selectedIndexNavbar } from "~/redux/Navbar/NavbarReducer";
import { useDispatch, useSelector } from "react-redux";
import { GetIndex } from "~/redux/Navbar/NavbarAction";

const Nav = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.secondary,
}));

const NavProduct = () => {
  const value = useSelector(selectedIndexNavbar);
  const dispatch = useDispatch();

  return (
    <Nav
      maxWidth="xl"
      disableGutters
      sx={{
        display: { xs: "none", md: "flex" },
      }}
    >
      <Container maxWidth="lg">
        <BottomNavigation showLabels value={value}>
          {NavProductData.filter((data) => data.navbarProduct).map(
            (data, index) => {
              return (
                <BottomNavigationAction
                  key={index}
                  href={data.url}
                  label={data.name}
                  icon={data.icon}
                  onClick={() => {
                    dispatch(GetIndex(index));
                  }}
                />
              );
            }
          )}
        </BottomNavigation>
      </Container>
    </Nav>
  );
};

export default NavProduct;
