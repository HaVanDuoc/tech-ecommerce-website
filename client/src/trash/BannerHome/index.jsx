import "./BannerHome.scss";
import { Container, styled } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const items = [
  {
    url: "#",
    src: "assets/banner/TGDDDESK-1920x450.png",
    alt: "Galaxy A Series",
  },
  {
    url: "#",
    src: "assets/banner/TGDDDESK-1920x450.png",
    alt: "Galaxy A Series",
  },
  {
    url: "#",
    src: "assets/banner/TGDDDESK-1920x450.png",
    alt: "Galaxy A Series",
  },
];

const HomeBanner = styled(Container)(({ theme }) => ({}));


const BannerHome = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <HomeBanner id="banner-home" maxWidth="xl" disableGutters>
      <Carousel autoPlay infiniteLoop emulateTouch showStatus={false} showThumbs={false}>
        {items.map((item, index) => (
          <div className="item" key={index}>
            <img className="d-block w-100" src={PF + item.src} alt={item.alt} />
          </div>
        ))}
      </Carousel>
    </HomeBanner>
  );
};

export default BannerHome;
