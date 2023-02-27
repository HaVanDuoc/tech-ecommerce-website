import { Link } from "react-router-dom";

const { Typography, Box, Button, Stack } = require("@mui/material");

export const AdminTitle = ({ children }) => (
  <Typography variant="h4" marginBottom={4}>
    {children}
  </Typography>
);

export const FieldForm = ({ children }) => (
  <Box
    sx={{
      width: "400px",
      display: "flex",
      flexDirection: "column",
      marginTop: "10px",
      marginRight: "20px",
      marginBottom: 2,

      "& > input": {
        height: "45px",
        padding: "10px",
        border: "1px solid gray",
        borderRadius: "5px",
        fontSize: "16px",
      },
    }}
  >
    {children}
  </Box>
);

export const LabelField = ({ children }) => (
  <Box
    sx={{
      marginBottom: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#979696",
    }}
  >
    {children}
  </Box>
);

export const StackButtons = ({ children }) => {
  return (
    <Stack
      flex={1}
      display="flex"
      flexDirection="row"
      justifyContent="right"
      sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)", padding: 2 }}
    >
      {children}
    </Stack>
  );
};

export const ButtonCreate = ({ children, href }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "teal",
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 2,
        textTransform: "capitalize",

        "&:hover": {
          backgroundColor: "#036363",
        },
      }}
    >
      <Link to={href} className="link">
        {children || "Create new"}
      </Link>
    </Button>
  );
};
