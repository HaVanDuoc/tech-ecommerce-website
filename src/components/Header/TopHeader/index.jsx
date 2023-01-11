import { Container, Link } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export const socialMediaLinks = [
  // { url: "#", name: "Trang chủ" },
  // { url: "#", name: "Giới thiệu" },
  // { url: "#", name: "Liên hệ" },
  { url: "#", name: <FacebookIcon /> },
  { url: "#", name: <InstagramIcon /> },
  { url: "#", name: <TwitterIcon /> },
];

const TopHeader = () => {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        backgroundColor: "#BBB2A6",
        display: { md: "flex", xs: "none" },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: "50px",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        {socialMediaLinks.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            sx={{
              color: "#fff",
              fontWeight: "500",
              textDecoration: "none",
              textTransform: "uppercase",
              margin: "0 5px",
              transition: "color .4s ease",

              "& :hover": {
                color: "var(--color-light) !important",
              },
            }}
          >
            {link.name}
          </Link>
        ))}
      </Container>
    </Container>
  );
};

export default TopHeader;
