import React, { Fragment } from "react";
import ListProduct from "~/components/ContentProductPage";
import Nav from "~/components/Nav";

const HeadPhone = () => {
  return (
    <Fragment>
      <Nav />
      <ListProduct />;
    </Fragment>
  );
};

export default HeadPhone;
