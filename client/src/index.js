import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import { GlobalStyles } from "./styles";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </Provider>
    </GlobalStyles>
  </React.StrictMode>
);
