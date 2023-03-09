import { Box, Card, CardContent, List, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Slick from "~/components/Slick";
import {
  formatCost,
  formatDiscount,
  formatVND,
  getPrice,
} from "~/helper/format";
import { PF } from "~/__variables";
import { Section } from "../StyledHome";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { dummyData } from "../dummyData";

const Header = ({ children }) => {
  return (
    <Stack
      flexGrow={1}
      flexDirection="row"
      justifyContent="space-between"
      minHeight={150}
      alignItems="center"
    >
      {children}
    </Stack>
  );
};

const LogoFlashSale = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",

        img: {
          position: "absolute",
          top: -110,
          width: 250,
          zIndex: 99,
        },
      }}
    >
      {children}
    </Box>
  );
};

const CountdownBox = ({ children }) => {
  return <Box>{children}</Box>;
};

const ShowAll = ({ children }) => {
  return (
    <Box
      sx={{
        a: {
          color: "white",
          fontSize: 16,
          textTransform: "capitalize",
        },
      }}
    >
      <Link to="#">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",

            ".value": {
              fontStyle: "inherit",
              transition: "all .5s ease-in-out",
            },

            ".iconArrow": {
              transform: "translateX(0px)",
              transition: "all .5s ease-in-out",
            },

            "&:hover": {
              ".value": {
                fontStyle: "italic",
              },

              ".iconArrow": {
                transform: "translateX(5px)",
              },
            },
          }}
        >
          <Typography className="value">{children}</Typography>
          <ArrowForwardIosOutlinedIcon fontSize="16px" className="iconArrow" />
        </Box>
      </Link>
    </Box>
  );
};

const settings = {
  dot: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
};

const FlashSale = () => {
  return (
    <Box>
      <Section backgroundColor="#ff6259">
        <Header>
          <LogoFlashSale>
            <img src={PF + "/assets/flashSale/img1.png"} alt="" />
          </LogoFlashSale>

          <CountdownBox></CountdownBox>

          <ShowAll>Xem tất cả</ShowAll>
        </Header>

        <List>
          <Slick settings={settings}>
            {dummyData.map((item, index) => (
              <Box sx={{ paddingLeft: 1, paddingRight: 1 }} key={index}>
                <Card
                  sx={{
                    paddingTop: 3,
                    paddingBottom: 3,
                    cursor: "pointer",

                    ".cardMedia img": {
                      marginTop: "10px",
                      transition: "all .3s ease-in-out",
                    },

                    "&:hover": {
                      ".cardMedia img": {
                        transition: "all .3s ease-in-out",
                        marginBottom: "10px",
                      },

                      ".nameProduct": {
                        transition: "all .3s ease-in-out",
                        color: "dodgerblue",
                      },
                    },
                  }}
                >
                  <Box
                    className="cardMedia"
                    sx={{
                      height: 250,
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
                      {formatVND(getPrice(item.cost, item.discount))}
                    </Typography>
                    <Stack
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      textAlign="center"
                    >
                      <Typography>
                        {formatCost(formatVND(item.cost))}
                      </Typography>
                      <Typography
                        marginLeft={1}
                        color="crimson"
                        fontWeight={500}
                      >
                        {formatDiscount(item.discount)}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slick>
        </List>
      </Section>
    </Box>
  );
};

export default FlashSale;
