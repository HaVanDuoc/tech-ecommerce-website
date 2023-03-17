import React, { Fragment } from "react";
import ListProduct from "~/components/page/ContentProductPage";
import Nav from "~/components/Nav";

const Tivi = () => {
  return (
    <Fragment>
      <Nav />
      <ListProduct />;
    </Fragment>
  );
};

export default Tivi;