import { Box, styled } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";

const Styled = styled(Box)(({ theme }) => ({}));

const Header = () => {
  return (
    <Styled>
      <MainHeader />
    </Styled>
  );
};

export default Header;
