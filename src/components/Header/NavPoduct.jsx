import { Box, Container, Stack, styled, Typography } from "@mui/material";
import React from "react";
import { productList } from "./ArrayData";

const Nav = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const Product = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  cursor: "pointer",
}));

const NavProduct = () => {
  return (
    <Nav maxWidth="xl" disableGutters>
      <Container disableGutters>
        <Stack
          alignItems="center"
          height="auto"
          flexDirection="row"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          {productList
            .filter((productList) => productList.navbarProduct)
            .map((product, index) => (
              <Product flexGrow={1} key={index} sx={{ height: "4rem" }}>
                {product.icon}
                {product.name}
              </Product>
            ))}
        </Stack>
      </Container>
    </Nav>
  );
};

export default NavProduct;
