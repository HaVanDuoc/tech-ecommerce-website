import React, { Fragment } from "react";
import ListProduct from "~/components/ContentProductPage";
import Nav from "~/components/Nav";

const Fridge = () => {
  return (
    <Fragment>
      <Nav />
      <ListProduct />;
    </Fragment>
  );
};

export default Fridge;
