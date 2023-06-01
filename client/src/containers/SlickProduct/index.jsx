import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { PF } from "~/utils/__variables";

const Wrapper = styled(Box)(() => ({
  "& .slick-slide": {
    paddingRight: "10px",
  },
}));

const Title = ({ children }) => (
  <Typography
    sx={{ fontSize: "1rem", fontWeight: 500, padding: "0 10px 5px" }}
  >
    {children}
  </Typography>
);

const SlickProduct = ({ title, data }) => {
  const folder = "/assets/products/";

  return (
    <Wrapper>
      <Title>{title}</Title>

      <Slider dots={false} infinite={true} slidesToShow={5} slidesToScroll={5}>
        {data.map((item, index) => (
          <Link href={item.href}>
            <Card key={index}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={PF + folder + item.img}
                  alt={item.alt}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default SlickProduct;
