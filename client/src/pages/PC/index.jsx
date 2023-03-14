import React, { Fragment } from "react";
import ListProduct from "~/components/ContentProductPage";
import Nav from "~/components/Nav";

const PC = () => {
  return (
    <Fragment>
      <Nav />
      <ListProduct />;
    </Fragment>
  );
};

export default PC;
