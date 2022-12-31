import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import { GlobalStyles } from "./styles";

const theme = createTheme({});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </GlobalStyles>
  </React.StrictMode>
);
