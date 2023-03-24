import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import { PF } from "~/__variables";
import { Link } from "react-router-dom";
import { NextArrow, PrevArrow } from "~/styles/slider";
import { formatCost, formatDiscount, formatPrice } from "~/helper/format";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

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

const Section = ({ children, backgroundColor }) => {
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor ? `${backgroundColor}` : "white",
        padding: 2,
        borderRadius: 3,
        boxShadow: "0 0 0.8125rem 0 rgb(0 0 0 / 5%)",
      }}
    >
      {children}
    </Box>
  );
};

const FlashSale = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: 2,
        ".slick-track": {
          height: "100%",

          div: {
            height: "100%",

            div: {
              height: "100%",
            },
          },
        },
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Section backgroundColor="#ff6259">
          <Header>
            <LogoFlashSale>
              <img src={PF + "/assets/flashSale/img1.png"} alt="" />
            </LogoFlashSale>

            <CountdownBox></CountdownBox>

            <ShowAll>Xem tất cả</ShowAll>
          </Header>

          <Box sx={{ width: "100%", height: "100%" }}>
            <Slider
              dots={false}
              infinite={true}
              speed={500}
              slidesToScroll={4}
              slidesToShow={4}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
              className="custom-slider"
            >
              {dummyData.map((item, index) => (
                <Box
                  sx={{ paddingLeft: 1, paddingRight: 1, height: "100%" }}
                  key={index}
                >
                  <Card
                    sx={{
                      height: "100%",
                      paddingTop: 3,
                      paddingBottom: 3,
                      cursor: "pointer",

                      ".cardMedia img": {
                        width: "100%",
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
                        minHeight: 200,
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
                        {formatPrice(item.cost, item.discount)}
                      </Typography>
                      <Stack
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                      >
                        <Typography>{formatCost(item.cost)}</Typography>
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
            </Slider>
          </Box>
        </Section>
      </Container>
    </Box>
  );
};

export default FlashSale;

const dummyData = [
  {
    id: 1,
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    cost: "8000000",
    discount: "20",
  },
  {
    id: 2,
    name: "Nồi chiên không dầu Crystal AF7002A-N 6.8 lít",
    image:
      "noi-chien-khong-dau-crystal-af7002a-n-68-lit-090822-042946-600x600.webp",
    cost: "8000000",
    discount: "20",
  },
  {
    id: 3,
    name: "Casper Android TV 55UG6100",
    image: "smart-casper-4k-55-inch-55ug6100-(78).webp",
    cost: "8800000",
    discount: "20",
  },
  {
    id: 4,
    name: "Samsung Inverter 236 lít RT22M4032BY/SV",
    image: "samsung-rt22m4032by-sv-300x300.webp",
    cost: "7200000",
    discount: "20",
  },
  {
    id: 5,
    name: "Máy khoan động lực điện Bosch GSB 16 RE 750W",
    image: "bosch-gsb-16-re-11-300x300.webp",
    cost: "1400000",
    discount: "20",
  },
  {
    id: 1,
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    cost: "8000000",
    discount: "20",
  },
  {
    id: 1,
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    cost: "8000000",
    discount: "20",
  },
  {
    id: 1,
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    cost: "8000000",
    discount: "20",
  },
  {
    id: 1,
    name: "Sharp Android TV 4T-C55EK2X",
    image: "android-tivi-sharp-4k-50-inch-4t-c-101022-112216-550x340.webp",
    cost: "8000000",
    discount: "20",
  },
];
