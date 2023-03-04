import React from "react";
import { Box, styled } from "@mui/material";
import { Footer, Header } from "~/components";

const DefaultLayoutWrapper = styled(Box)(() => ({}));

const Body = styled(Box)(() => ({}));

const DefaultLayout = ({ children }) => {
  return (
    <DefaultLayoutWrapper>
      <Header />

      <Body>{children}</Body>

      <Footer />
    </DefaultLayoutWrapper>
  );
};

export default DefaultLayout;
