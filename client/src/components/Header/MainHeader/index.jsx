import { Box, Container, Stack, styled } from "@mui/material";
import React from "react";
import Brand from "./Brand";
import RightItems from "./RightItems";
import Search from "./Search";

const HeaderWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
}));

const MainHeader = () => {
  return (
    <HeaderWrapper>
      <Container maxWidth="xl">
        <Stack flexDirection="row" alignItems="center" padding={1}>
          <Brand />
          <Search />
          <RightItems />
        </Stack>
      </Container>
    </HeaderWrapper>
  );
};

export default MainHeader;
