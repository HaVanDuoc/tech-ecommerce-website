import { Box, Link, styled } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { PF } from "~/__variables";

const BannerPrimaryWrapper = styled(Box)(() => ({
  borderRadius: "var(--border-radius)",
  overflow: "hidden",
}));

const BannerItems = [
  { src: "banner1.png", alt: "", href: "" },
  { src: "banner2.png", alt: "", href: "" },
  { src: "banner3.png", alt: "", href: "" },
];

const BannerPrimary = () => {
  const folder = "/assets/banner/";

  return (
    <BannerPrimaryWrapper>
      <Carousel infiniteLoop autoPlay emulateTouch showStatus={false} showThumbs={false}>
        {BannerItems.map((item, index) => (
          <Box className="item" key={index}>
            <Link href={item.href}>
              <img src={PF + folder + item.src} alt={item.alt} />
            </Link>
          </Box>
        ))}
      </Carousel>
    </BannerPrimaryWrapper>
  );
};

export default BannerPrimary;
