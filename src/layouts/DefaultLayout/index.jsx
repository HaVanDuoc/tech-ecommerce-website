import React from "react";
import { Header } from "~/components";

const DefaultLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default DefaultLayout;
