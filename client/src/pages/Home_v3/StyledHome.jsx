import { Box, Container, Typography } from "@mui/material";

export const Wrap = ({ children }) => {
  return <Container disableGutters>{children}</Container>;
};

export const Section = ({ children, backgroundColor }) => {
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor ? `${backgroundColor}` : "white",
        padding: 2,
        borderRadius: 3,
        marginTop: 4,
        marginBottom: 4,
        boxShadow: "0 0 0.8125rem 0 rgb(0 0 0 / 5%)",
      }}
    >
      {children}
    </Box>
  );
};

export const Title = ({ children }) => {
  return <Typography>{children}</Typography>;
};
