import { Box, Container, styled, Typography } from "@mui/material";
import React from "react";

const Styled = styled(Box)(({ theme }) => ({}));

const TitleSecondary = ({ children }) => {
  return (
    <Styled>
      <Container maxWidth="lg" disableGutters>
        <Typography
          variant="h6"
          sx={{
            textTransform: "uppercase",
          }}
        >
          {children}
        </Typography>
      </Container>
    </Styled>
  );
};

export default TitleSecondary;
