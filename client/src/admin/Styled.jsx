const { Typography, Box } = require("@mui/material");

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
