import React from "react";
import "./Header.scss";
import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";
import NavHeader from "./NavHeader";

const Header = () => {
  return (
    <React.Fragment>
      <TopHeader />
      <MainHeader />
      <NavHeader />
    </React.Fragment>
  );
};

export default Header;
