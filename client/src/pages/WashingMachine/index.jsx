import React, { Fragment } from "react";
import ListProduct from "~/components/ListProduct";
import Nav from "~/components/Nav";

const WashingMachine = () => {
  return (
    <Fragment>
      <Nav />
      <ListProduct />;
    </Fragment>
  );
};

export default WashingMachine;
