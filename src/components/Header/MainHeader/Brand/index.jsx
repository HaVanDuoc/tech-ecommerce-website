import { Box, Typography } from "@mui/material";
import React from "react";

const Brand = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "2em",
          color: "var(--color-main)",
          cursor: "pointer",
        }}
      >
        Tech
      </Typography>
    </Box>
  );
};

export default Brand;
