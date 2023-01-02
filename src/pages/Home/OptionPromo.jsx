import { Box, Container, Grid, styled, Typography } from "@mui/material";
import React from "react";

const Item = styled(Box)(({ theme }) => ({}));

const OptionPromo = () => {
  return (
    <Container>
      <Grid container>
        <Grid>
          <Item>
            <img
              src=""
              alt=""
            />
            <Typography>Nhận mã giảm đến 500k</Typography>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OptionPromo;
