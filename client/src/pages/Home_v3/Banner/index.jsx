import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Wrap } from "~/styles/styled";
import { PF } from "~/__variables";

const bigBanner = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: "0 auto",
  overflow: "hidden",
};

const styledSlider = {};

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 300,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  const dummyData = [
    { link: "", src: "720-220-720x220-17.png" },
    { link: "", src: "720x220-720x220-14.png" },
    { link: "", src: "720-220-720x220-71.png" },
    { link: "", src: "720-220-720x220-71.jpg" },
    { link: "", src: "720-220-720x220-17.png" },
  ];

  return (
    <Box sx={{ position: "relative", marginBottom: "120px" }}>
      <Box sx={bigBanner}>
        <img
          src={PF + "/assets/banner/Banner-Bighero---Desk---Nen-1920x450.jpg"}
          alt=""
          style={{ width: "100%" }}
        />
      </Box>

      <Box
        className="mainBanner"
        sx={{
          position: "absolute",
          left: "50%",
          bottom: "-95px",
          transform: "translateX(-50%)",
        }}
      >
        <Wrap>
          <Slider {...settings} sx={styledSlider}>
            {dummyData.map((item, index) => (
              <Box
                key={index}
                sx={{
                  paddingLeft: 1,
                  paddingRight: 1,
                }}
              >
                <Link>
                  <Box>
                    <img
                      src={PF + "/assets/banner/" + item.src}
                      alt=""
                      width="100%"
                      style={{ borderRadius: "15px" }}
                    />
                  </Box>
                </Link>
              </Box>
            ))}
          </Slider>
        </Wrap>
      </Box>
    </Box>
  );
};

export default Banner;
