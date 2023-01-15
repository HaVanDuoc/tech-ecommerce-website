import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { PF } from "~/__variables";

const SlickProductWrapper = styled(Box)(() => ({}));

const Title = styled(Typography)(() => ({
  fontSize: "1rem",
  fontWeight: 500,
  padding: "5px",
}));

const Card = (props) => {
  const folder = "/assets/products/";

  const { data } = props;

  console.log(data);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={PF + folder + "xiaomi-11t-(20).jpg"}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const SlickProduct = (props) => {
  const { title, data } = props;

  return (
    <SlickProductWrapper>
      <Grid container>
        <Grid item xs={12}>
          <Title>{title}</Title>
        </Grid>
        <Grid item xs={12}>
          <Slider
            dots={false}
            infinite={true}
            slidesToShow={5}
            slidesToScroll={5}
          >
            {data.map((data, index) => (
              <Card data={data} key={index} />
            ))}
          </Slider>
        </Grid>
      </Grid>
    </SlickProductWrapper>
  );
};

export default SlickProduct;
