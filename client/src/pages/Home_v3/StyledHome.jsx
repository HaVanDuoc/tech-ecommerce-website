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
  return (
    <Typography
      sx={{
        paddingBottom: 2,
        color: "#333",
        fontWeight: 500,
        textTransform: "uppercase",
        fontSize: "24px",
        lineHeight: "36px",
      }}
    >
      {children}
    </Typography>
  );
};

export const List = ({ children }) => {
  return <Box>{children}</Box>;
};
