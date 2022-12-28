import React from "react";
import { TopBar } from "~/components";

const DefaultLayout = ({ children }) => {
  return (
    <React.Fragment>
      <TopBar />
      {children}
    </React.Fragment>
  );
};

export default DefaultLayout;
