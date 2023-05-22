import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  formatCost,
  formatDiscount,
  formatPrice,
  formatVND,
} from "~/helper/format";
import axiosInstance from "~/utils/axiosInstance";

const Styles = styled(Box)(() => ({
  ".card:hover": {
    ".imageCard": {
      transform: "translateY(-10px)",
    },

    ".nameCard": {
      color: "var(--color-main)",
    },

    ".priceCard": {
      color: "crimson",
    },
  },

  ".imageCard": {
    transition: "all .3s ease-in-out",
    marginTop: "40px",
    marginBottom: "20px",
  },

  ".nameCard": {
    transition: "all .3s ease-in-out",
    fontSize: "16px",
  },

  ".priceCard": {
    transition: "all .3s ease-in-out",
    fontWeight: 500,
    fontSize: "18px",
  },
}));

const ContentProductPage = () => {
  const [rating] = useState(4);
  const [list, setList] = useState([]);
  const page = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance({
        method: "post",
        url: `/sectionProduct/getListProduct/${page}`,
      });

      setList(response.data.data);
    };

    fetch();
  }, [page]);

  return (
    <Styles className="sectionProduct">
      <Container maxWidth="lg" disableGutters>
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ marginTop: 3, marginBottom: 1 }}
        >
          {list.length > 0 && (
            <Typography sx={{ fontWeight: 500, marginRight: 2 }}>
              {list.length + " " + list[0].category}
            </Typography>
          )}

          <Box>
            Xếp theo
            <Button>Phổ biến</Button>
            <Button>Mới nhất</Button>
            <Button>Bán chạy</Button>
          </Box>
        </Stack>

        <Grid container spacing={1.5} className="listProduct">
          {Array.isArray(list) &&
            list.map((item, index) => (
              <Grid item xs={2.4} key={index}>
                <Link to={`/product/${item.name}`}>
                  <Card className="card" sx={{ height: "100%" }}>
                    <CardActionArea
                      sx={{
                        height: "100%",
                        alignItems: "none",
                        display: "flex",
                        justifyContent: "start",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt=""
                        className="imageCard"
                        sx={{
                          height: "230px",
                          maxHeight: "230px",
                        }}
                      />

                      <CardContent sx={{ width: "100%" }}>
                        <Typography className="nameCard">
                          {item.name}
                        </Typography>

                        <Stack flexDirection="row" alignItems="center">
                          {item.discount && (
                            <Fragment>
                              <Typography>
                                {formatCost(formatVND(item.price))}
                              </Typography>

                              <Typography
                                marginLeft={1}
                                color="crimson"
                                fontWeight={500}
                              >
                                {formatDiscount(item.discount)}
                              </Typography>
                            </Fragment>
                          )}
                        </Stack>

                        <Typography className="priceCard">
                          {formatVND(formatPrice(item.price, item.discount))}
                        </Typography>

                        <Stack
                          flexGrow={1}
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Rating
                            name="read-only"
                            value={rating}
                            readOnly
                            size="small"
                          />
                          <Typography sx={{ fontSize: "14px", marginLeft: 1 }}>
                            23
                          </Typography>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Styles>
  );
};

export default ContentProductPage;
