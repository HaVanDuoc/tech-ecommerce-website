import { Container, styled } from "@mui/material";
import React from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { BannerData } from "./BannerData";
import './Banner.scss'

const ContainerBanner = styled(Container)(({ theme }) => ({
  margin: "5vw 0",
}));

const Banner = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <ContainerBanner id="banner-main">
      <ReactOwlCarousel items={1} autoplay loop margin={10} nav>
        {BannerData.map((banner, index) => (
          <div className="item">
            <img
              className="d-block w-100"
              src={PF + banner.src}
              alt={banner.alt}
            />
          </div>
        ))}
      </ReactOwlCarousel>
    </ContainerBanner>
  );
};

export default Banner;
