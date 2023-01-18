import { Box, Container, Grid, styled } from "@mui/material";
import React from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";

const HomePageWrapper = styled(Box)(() => ({
  position: "relative",
}));

const HomePage = () => {
  return (
    <HomePageWrapper>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>

          <Grid item xs={10}>
            <Content />
          </Grid>
        </Grid>
      </Container>
    </HomePageWrapper>
  );
};

export default HomePage;
