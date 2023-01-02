import React from "react";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const CarouselProduct = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <ReactOwlCarousel items={3} autoplay>
      <div className="item">
        <img src={PF + "assets/banner/banner-1.png"} alt="" />
      </div>
      <div className="item">
        <img src={PF + "assets/banner/banner-1.png"} alt="" />
      </div>
      <div className="item">
        <img src={PF + "assets/banner/banner-1.png"} alt="" />
      </div>
      <div className="item">
        <img src={PF + "assets/banner/banner-1.png"} alt="" />
      </div>
      
    </ReactOwlCarousel>
  );
};

export default CarouselProduct;
