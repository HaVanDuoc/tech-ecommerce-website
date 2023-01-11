import { Box, Container, Grid, styled } from "@mui/material";
import React from "react";
import { CardProduct } from "~/components";
import TitleHome from "../components/TitlePrimary";

const Styled = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(10),
}));

const SanPhamNoiBac = () => {
  return (
    <Styled>
      <Container maxWidth="lg" disableGutters>
        <TitleHome>Sản phẩm nổi bậc</TitleHome>
        <Grid
          container
          // spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 12, md: 20 }}
        >
          {Array.from(Array(10)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <CardProduct />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Styled>
  );
};

export default SanPhamNoiBac;
