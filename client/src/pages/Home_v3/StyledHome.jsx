import { Container, Typography } from "@mui/material";

export const Wrap = ({ children }) => {
  return <Container disableGutters>{children}</Container>;
};

export const Title = ({ children }) => {
  return <Typography >{children}</Typography>;
};
