import {
  Box,
  Card,
  CardContent,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Section } from "../StyledHome";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { formatVND } from "~/helper/format";
import { PF } from "~/__variables";
import Slick from "~/components/Slick";

const dummyData = [
  {
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    price: "8000000",
  },
  {
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    price: "8000000",
  },
  {
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    price: "8000000",
  },
  {
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    price: "8000000",
  },
  {
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    price: "8000000",
  },
  {
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    price: "8000000",
  },
  {
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    price: "8000000",
  },
  {
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    price: "8000000",
  },
  {
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    price: "8000000",
  },
];

const settings = {
  dot: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 4,
};

const List = ({ children }) => {
  return <Box>{children}</Box>;
};

const Header = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

const TopFind = () => {
  return (
    <Box>
      <Section>
        <Header
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ textTransform: "uppercase", color: "var(--color-main)" }}
          >
            Tìm kiếm hàng đầu
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "var(--color-main)" }}>
              Xem tất cả
            </Typography>
            <ArrowForwardIosOutlinedIcon
              sx={{ fontSize: "16px", color: "var(--color-main)" }}
            />
          </Box>
        </Header>

        <Box>
          <Box>
            <List>
              <Slick settings={settings}>
                {dummyData.map((item, index) => (
                  <Box sx={{ paddingLeft: 1, paddingRight: 1 }}>
                    <Card
                      sx={{
                        paddingTop: 3,
                        paddingBottom: 3,
                        cursor: "pointer",

                        "&:hover": {
                          ".boxImage img": {
                            transition: "all .3s ease-in-out",
                            transform: "translateY(-10px)",
                          },

                          ".nameProduct": {
                            transition: "all .3s ease-in-out",
                            color: "dodgerblue",
                          },
                        },
                      }}
                      key={index}
                    >
                      <Box
                        className="boxImage"
                        sx={{
                          height: 200,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={PF + "/assets/products/" + item.image}
                          alt=""
                          width="100%"
                        />
                      </Box>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          fontSize={16}
                          component="div"
                          className="nameProduct"
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontSize={18}
                          fontWeight={500}
                          color="#ba000d"
                        >
                          {formatVND(item.price)}
                        </Typography>
                        <Typography></Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Slick>
            </List>
          </Box>
        </Box>
      </Section>
    </Box>
  );
};

export default TopFind;
