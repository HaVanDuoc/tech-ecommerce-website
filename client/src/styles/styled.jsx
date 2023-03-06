import { Container } from "@mui/material";

export const Wrap = ({ children }) => (
  <Container disableGutters>{children}</Container>
);

export const card = {
  paddingTop: 3,
  paddingBottom: 3,
  cursor: "pointer",

  ".boxImage img": {
    marginTop: "10px",
    transition: "all .3s ease-in-out",
  },

  "&:hover": {
    ".boxImage img": {
      transition: "all .3s ease-in-out",
      marginBottom: "10px",
    },

    ".nameProduct": {
      transition: "all .3s ease-in-out",
      color: "dodgerblue",
    },
  },
};

export const nameProduct = {};
