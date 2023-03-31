import React, { Fragment } from "react";
import { Footer, Header } from "~/components";

const ProductDetails = ({ children }) => {
  return (
    <section
      className="product-details-layout"
      style={{ backgroundColor: "#fff" }}
    >
      <Header />
      <Fragment>{children}</Fragment>
      <Footer />
    </section>
  );
};

export default ProductDetails;
