import React, { Fragment } from "react";
import { Footer } from "~/components";

const ProductDetails = ({ children }) => {
  return (
    <section className="profile-layout">
      <Fragment>{children}</Fragment>
      <Footer />
    </section>
  );
};

export default ProductDetails;
