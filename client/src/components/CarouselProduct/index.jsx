import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselProduct = () => {
  return (
    <Carousel autoPlay infiniteLoop emulateTouch>
      <div>
        <img src="assets/banner/banner-1.png" alt="" />
      </div>
      <div>
        <img src="assets/banner/banner-2.png" alt="" />
      </div>
      <div>
        <img src="assets/banner/banner-3.png" alt="" />
      </div>
    </Carousel>
  );
};

export default CarouselProduct;
