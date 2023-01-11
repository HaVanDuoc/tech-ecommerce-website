import { Box, Container } from "@mui/material";

import React from "react";
import DrawerHeader from "../DrawerHeader";
import Brand from "./Brand";
import RightNavbar from "./RightNavbar";
import SearchMainHeader from "./SearchMainHeader";

const MainHeader = () => {
  return (
    <Container disableGutters maxWidth="xl" position="static" enableColorOnDark sx={{backgroundColor: "#fff"}}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          flexGrow={1}
          display="flex"
          justifyContent="start"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <DrawerHeader />
        </Box>

        <Box
          flexGrow={1}
          display="flex"
          justifyContent="start"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <SearchMainHeader />
        </Box>

        <Box flexGrow={1} display="flex" justifyContent="center">
          <Brand />
        </Box>

        <Box flexGrow={1} display="flex" justifyContent="end">
          <RightNavbar />
        </Box>
      </Container>
    </Container>
  );
};

export default MainHeader;
