import { Container } from "@mui/material";
import React from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { BannerMainData, BannerSecondaryData } from "./BannerData";
import "./Banner.scss";

const Banner = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const bannerMainOptions = {
    autoplay: false,
    loop: true,
    nav: false,
    center: true,
    responsive: { 0: { items: 1 } },
  };

  const bannerSecondaryOptions = {
    autoplay: true,
    loop: true,
    nav: true,
    margin: 10,
    items: 2,
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl" id="banner-main" disableGutters>
        <ReactOwlCarousel {...bannerMainOptions}>
          {BannerMainData.map((banner, index) => (
            <div className="item" key={index}>
              <img
                className="d-block w-100"
                src={PF + banner.src}
                alt={banner.alt}
              />
            </div>
          ))}
        </ReactOwlCarousel>
      </Container>
      <Container maxWidth="lg" id="banner-secondary" disableGutters>
        <ReactOwlCarousel {...bannerSecondaryOptions}>
          {BannerSecondaryData.map((banner, index) => (
            <div className="item" key={index}>
              <img
                className="d-block w-100"
                src={PF + banner.src}
                alt={banner.alt}
              />
            </div>
          ))}
        </ReactOwlCarousel>
      </Container>
    </React.Fragment>
  );
};

export default Banner;
