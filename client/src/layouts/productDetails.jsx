import React, { Fragment } from "react";
import { Header } from "~/components";

const ProductDetails = ({ children }) => {
  return (
    <section className="product-details-layout">
      <Header />
      <Fragment>{children}</Fragment>
    </section>
  );
};

export default ProductDetails;
