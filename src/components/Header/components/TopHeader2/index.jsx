import { Box, Container, Link, styled } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import { PF } from "~/__variables";

const items = [
  { img: "1200-44-1200x44-6.png", alt: "#", url: "#" },
  { img: "1200-44-1200x44-10.png", alt: "#", url: "#" },
];

const Styled = styled(Box)(({ theme }) => ({}));

const TopHeader2 = () => {
  const path = "/assets/top-header/";

  return (
    <Styled>
      <Container maxWidth="xl">
        <Container maxWidth="lg" disableGutters>
          <Carousel
            // autoPlay
            infiniteLoop
            emulateTouch
            showStatus={false}
            showThumbs={false}
          >
            {items.map((item, index) => (
              <Link href={item.url} key={index}>
                <img src={PF + path + item.img} alt={item.url} />
              </Link>
            ))}
          </Carousel>
        </Container>
      </Container>
    </Styled>
  );
};

export default TopHeader2;
