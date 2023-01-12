import React from "react";
import "./Header.scss";
import MainHeader from "./MainHeader";
import NavHeader from "./NavHeader";
// import TopHeader2 from "./components/TopHeader2";

const Header = () => {
  return (
    <React.Fragment>
      {/* <TopHeader2 /> */}
      <MainHeader />
      <NavHeader />
    </React.Fragment>
  );
};

export default Header;
