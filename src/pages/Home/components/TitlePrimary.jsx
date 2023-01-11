import { Box, styled, Typography } from "@mui/material";
import React from "react";

const Styled = styled(Box)(({ theme }) => ({}));

const TitlePrimary = ({ children }) => {
  return (
    <Styled>
      <Typography
        variant="h6"
        sx={{
          fontSize: "1.8rem",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          lineHeight: "1.3em",
          position: "relative",
          margin: "0",
          marginBottom: "0.8em",
          paddingBottom: "1.3em",
        }}
      >
        {children}
      </Typography>
    </Styled>
  );
};

export default TitlePrimary;
