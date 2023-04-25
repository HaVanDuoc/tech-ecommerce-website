import "~/styles/slider";
import { NextArrow, PrevArrow } from "~/styles/slider";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { Footer } from "~/components";
import { PF } from "~/__variables";
import { AppBar } from "~/components/Header";
import axios from "axios";
import { formatVND } from "~/helper/format";
import { default as SliderMaterial } from "@mui/material/Slider";
import Card from "~/components/card";
import { useDispatch, useSelector } from "react-redux";
import { selectorProducts } from "~/redux/products/reducer";
import { ProductsAction } from "~/redux/products/actions";

const Products = () => {
  const [fetch, setFetch] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [isPending, setPending] = useState(false);
  const [category, setCategory] = useState(null);
  const current = useParams().category; // get category of current page
  const dispatch = useDispatch();

  const products = useSelector(selectorProducts);

  console.log('products', products)

  const fetchProducts = async (category) => {
    setPending(true);

    const response = await axios({
      method: "post",
      url: "/client/products",
      data: { category, pagination },
    });

    dispatch(ProductsAction(category, response.data));

    setFetch(response.data);

    setPending(false);
  };

  useEffect(() => {
    switch (current) {
      case "dien-thoai":
        setCategory("Điện thoại");

        // Nếu trong redux chưa có fetch dữ liệu -> fetch()
        // Đã có rồi thì lấy set lại
        if (!products.dienthoai.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.dienthoai.products);
        }

        break;

      case "tablet":
        setCategory("Tablet");

        if (!products.tablet.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.tablet.products);
        }

        break;

      case "laptop":
        setCategory("Laptop");

        if (!products.laptop.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.laptop.products);
        }

        break;

      case "tai-nghe":
        setCategory("Tai nghe");

        if (!products.tainghe.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.tainghe.products);
        }

        break;

      case "dong-ho":
        setCategory("Đồng hồ");

        if (!products.dongho.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.dongho.products);
        }

        break;

      case "pc":
        setCategory("Pc");

        if (!products.pc.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.pc.products);
        }

        break;

      case "sim":
        setCategory("Sim");

        if (!products.sim.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.sim.products);
        }

        break;

      case "may-giat":
        setCategory("Máy giặt");

        if (!products.maygiat.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.maygiat.products);
        }

        break;

      case "tivi":
        setCategory("Tivi");

        if (!products.tivi.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.tivi.products);
        }

        break;

      case "tu-lanh":
        setCategory("Tủ lạnh");

        if (!products.tulanh.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.tulanh.products);
        }

        break;

      case "loa":
        setCategory("Loa");

        if (!products.loa.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.loa.products);
        }

        break;

      case "quat-dieu-hoa":
        setCategory("Quạt điều hòa");

        if (!products.quatdieuhoa.isFetch) {
          fetchProducts(category);
        } else {
          setFetch(products.quatdieuhoa.products);
        }

        break;

      default:
        break;
    }
  }, [current, category, pagination, dispatch]);

  return (
    <Wrapper>
      {/* AppBar */}
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)",
        }}
      >
        <AppBar />
      </Box>

      <Banner page={current} />

      <Body>
        <Container maxWidth="lg" disableGutters>
          {/* Brands */}
          <Box sx={{ marginBottom: 2 }}>
            <ListBrands category={category} />
          </Box>

          {/*  */}
          <Grid container spacing={2}>
            <Grid item xs={2.5}>
              {/* Danh muc */}
              <SectionCategories category={category} />

              {/* Bộ lọc */}
              <Box className="box filter">
                <Typography className="title">Bộ lọc</Typography>

                <Box sx={{ padding: "0 16px" }}>
                  <Typography sx={{ fontWeight: 500 }}>Giá</Typography>
                  <SliderPrice />
                </Box>
              </Box>
            </Grid>

            <Grid item xs>
              {/* Xếp theo */}
              <SortBy>
                <Box className="wrapper">
                  <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="span" fontWeight={500}>
                        Xếp theo
                      </Typography>

                      <Button>Sale</Button>
                      <Button>Mới nhất</Button>
                      <Button>Bán chạy</Button>
                    </Box>

                    <Box>
                      {isPending ? (
                        <Fragment />
                      ) : fetch?.countAll > 0 ? (
                        <Typography sx={{ fontWeight: 500 }}>
                          {`${fetch.countAll} ${fetch.data[0]?.category}`}
                        </Typography>
                      ) : (
                        <Typography sx={{ fontWeight: 500 }}>
                          Chưa có sản phẩm nào!
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
              </SortBy>

              {/* sản phẩm */}
              {isPending ? (
                <Stack
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height={460}
                >
                  <CircularProgress />
                  <Typography marginTop={2}>Chờ chút xíu...</Typography>
                </Stack>
              ) : (
                <ListProduct>
                  <Grid container spacing={1}>
                    {fetch?.data &&
                      fetch?.data.map((item, index) => {
                        return (
                          <Grid item xs={3} key={index}>
                            <Card product={item} />
                          </Grid>
                        );
                      })}
                  </Grid>

                  {fetch.totalPagination > 1 && (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      marginTop={5}
                    >
                      <Pagination
                        count={fetch.totalPagination}
                        defaultPage={fetch.currentPagination}
                        color="primary"
                        size="large"
                      />
                    </Stack>
                  )}
                </ListProduct>
              )}
            </Grid>
          </Grid>
        </Container>
      </Body>

      <Footer />
    </Wrapper>
  );
};

export default Products;

const Wrapper = styled(Box)(() => ({
  minHeight: "500px",

  ".box": {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",
    marginBottom: "16px",
    paddingBottom: "16px",

    ".list": {
      maxHeight: "300px",
      overflowY: "scroll",
    },

    ".title": {
      padding: "16px 24px",
      fontSize: "18px",
      fontWeight: 500,
    },

    ".item": {
      margin: "0 8px",
      padding: "0 16px",
      color: "#666",
      lineHeight: "35px",
      cursor: "pointer",
      transition: "all .3s ease",
      backgroundColor: "#fff",
      borderRadius: "5px",

      ":hover": {
        color: "var(--color-main)",
        backgroundColor: "#eee",
      },
    },
  },

  ".categories": {
    ".item.selected": {
      color: "var(--color-main)",
      backgroundColor: "#eee",
    },
  },

  ".filter": {},
}));

const ListProduct = styled(Box)(() => ({
  padding: "15px 0",
}));

const SortBy = styled(Box)(() => ({
  ".wrapper": {
    backgroundColor: "#fff",
    boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    padding: "10px 16px",

    "& button": {
      margin: "0 5px",
    },
  },
}));

const SliderPrice = () => {
  const [value, setValue] = React.useState();

  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  const valueLabelFormat = (value) => {
    return formatVND(value);
  };

  return (
    <SliderMaterial
      value={value}
      min={500000}
      max={50000000}
      step={100000}
      getAriaValueText={valueLabelFormat}
      valueLabelFormat={valueLabelFormat}
      onChange={handleChange}
      valueLabelDisplay="auto"
    />
  );
};

export const ListBrands = ({ category }) => {
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      let response = await axios({
        method: "post",
        url: "/client/productDetails/sectionBrands",
        data: { category },
      });

      setBrands(response.data.data);
    };

    fetch();
  }, [category]);

  return (
    <Box>
      {Array.isArray(brands) && brands.length > 0 && (
        <Container maxWidth="lg" disableGutters>
          <Grid container spacing={2}>
            {brands.map((item, index) => (
              <Grid item xs={1.5} key={index}>
                <Link
                  to={item.link}
                  style={{
                    width: "100%",
                    minHeight: "40px",
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "8px 17px",
                    overflow: "hidden",

                    "&::hover": {
                      borderColor: "dodgerblue",
                    },
                  }}
                >
                  <img src={item.logo} alt={item.name} width="100%" />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
};

const SectionCategories = ({ category }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios("/client/productDetails/sectionCategories");

      setCategories(response.data.data);
    };

    fetch();
  }, []);

  return (
    <Box className="box categories">
      <Typography className="title">Danh mục</Typography>
      <Stack className="list">
        {Array.isArray(categories) &&
          categories.map((item, index) => {
            return (
              <Link to={item?.link} key={index}>
                <Box
                  className={`item ${category === item?.name && "selected"}`}
                >
                  {item?.name}
                </Box>
              </Link>
            );
          })}
      </Stack>
    </Box>
  );
};

const Body = styled(Box)(() => ({}));

const Banner = ({ page }) => {
  let array = null;
  let category = page;

  const dienThoai = [
    { img: "-1.png", right: true },
    { img: "0.png", right: true },
    { img: "1.png" },
    { img: "2.png" },
    { img: "3.png" },
    { img: "4.png" },
    { img: "5.png" },
    { img: "6.png" },
  ];

  const tablet = [
    { img: "-1.png", right: true },
    { img: "0.png", right: true },
    { img: "1.png" },
    { img: "2.png" },
    { img: "3.png" },
    { img: "4.png" },
    { img: "5.png" },
    { img: "6.png" },
  ];

  const laptop = [
    { img: "-1.png", right: true },
    { img: "0.png", right: true },
    { img: "1.png" },
    { img: "2.png" },
    { img: "3.png" },
    { img: "4.png" },
    { img: "5.png" },
    { img: "6.png" },
    { img: "7.png" },
    { img: "8.png" },
    { img: "9.png" },
    { img: "10.png" },
  ];

  const taiNghe = [
    { img: "-1.png", right: true },
    { img: "0.png", right: true },
    { img: "1.png" },
    { img: "2.png" },
    { img: "3.png" },
    { img: "4.png" },
    { img: "5.png" },
    { img: "6.png" },
    { img: "7.png" },
    { img: "8.png" },
  ];

  switch (page) {
    case "dien-thoai":
      array = dienThoai;
      break;

    case "tablet":
      array = tablet;
      break;

    case "laptop":
      array = laptop;
      break;

    case "tai-nghe":
      array = taiNghe;
      break;

    case "dong-ho":
      array = dienThoai;
      category = "dien-thoai";
      break;

    case "pc":
      array = dienThoai;
      category = "dien-thoai";
      break;

    case "sim":
      array = dienThoai;
      category = "dien-thoai";
      break;

    case "may-giat":
      array = dienThoai;
      category = "dien-thoai";
      break;

    case "tivi":
      array = dienThoai;
      category = "dien-thoai";
      break;

    case "tu-lanh":
      array = dienThoai;
      category = "dien-thoai";
      break;

    case "loa":
      array = dienThoai;
      category = "dien-thoai";
      break;

    case "quat-dieu-hoa":
      array = dienThoai;
      category = "dien-thoai";
      break;

    default:
      break;
  }

  return (
    <Box
      sx={{
        padding: "10px 0",

        ".banner": {
          minHeight: "250px",

          ".prev-arrow": {
            opacity: 1,
            borderRadius: "50%",
            padding: "10px",
            transform: "translateX(-50%) !important",
          },

          ".next-arrow": {
            opacity: 1,
            borderRadius: "50%",
            padding: "10px",
            transform: "translateX(50%) !important",
          },
        },
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Stack flexDirection="row" alignItems="center">
          <Box width="66%">
            <Slider
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesPerRow={1}
              autoplay
              autoplaySpeed={5000}
              cssEase="linear"
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
              className="custom-slider banner"
            >
              {array &&
                array
                  .filter((array) => !array.right)
                  .map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                      }}
                    >
                      <img
                        src={`${PF}/assets/product-details/${category}/${item.img}`}
                        alt=""
                        width="100%"
                      />
                    </Box>
                  ))}
            </Slider>
          </Box>

          <Stack
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="35%"
          >
            <Box>
              {array &&
                array
                  .filter((array) => array.right)
                  .map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                      }}
                    >
                      <img
                        src={`${PF}/assets/product-details/${category}/${item.img}`}
                        alt=""
                        width="100%"
                      />
                    </Box>
                  ))}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
