import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
} from "@mui/material";
import React from "react";
import { NavHeaderData } from "./Data";

const NavHeader = () => {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        backgroundColor: "#F1F1F1",
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <BottomNavigation
          showLabels
          sx={{
            backgroundColor: "inherit",
            height: "auto",
          }}
        >
          {NavHeaderData.filter((data) => data.navbarProduct).map(
            (data, index) => {
              return (
                <BottomNavigationAction
                  key={index}
                  href={data.url}
                  label={data.name}
                  icon={data.icon}
                  sx={{
                    padding: "10px 0",
                    transition: "transform .5s ease",

                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              );
            }
          )}
        </BottomNavigation>
      </Container>
    </Container>
  );
};

export default NavHeader;
