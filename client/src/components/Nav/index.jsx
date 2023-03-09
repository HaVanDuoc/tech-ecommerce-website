import { Box, Container, Link, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { formatCapitalization } from "~/helper/format";

const categories = [
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
  { id: 1, name: "Điện thoại" },
];

const Styled = styled(Box)(() => ({
  ".slick-slider": {
    width: "100%",
  },

  ".slick-slider button": {
    width: "20px",
    height: "20px",
  },

  "button.slick-prev:before, button.slick-next:before": {
    fontSize: "20px",
    color: "var(--color-main)",
  },

  ".slick-prev.slick-disabled:before, .slick-next.slick-disabled:before": {
    opacity: 0,
  },
}));

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 10,
};

const Nav = () => {
  const [nav, setNav] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios("/client/nav");
      setNav(response.data.data);
    };

    fetch();
  }, []);

  return (
    <Styled>
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50px",
          }}
        >
          <Slider {...settings}>
            {Array.isArray(nav) &&
              nav.map((item, index) => (
                <Box
                  key={index}
                  sx={{ paddingLeft: "10px", paddingRight: "10px" }}
                >
                  <Link
                    href={item.link}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography display="flex" flexWrap="nowrap">
                      {formatCapitalization(item.name)}
                    </Typography>
                  </Link>
                </Box>
              ))}
          </Slider>
        </Box>
      </Container>
    </Styled>
  );
};

export default Nav;
