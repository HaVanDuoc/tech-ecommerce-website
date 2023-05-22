import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import "~/styles/slider";
import Slider from "react-slick";
import { PF } from "~/__variables";
import Card from "~/components/card";
import { Footer } from "~/components";
import { formatVND } from "~/helper/format";
import { AppBar } from "~/components/Header";
import { Link, useParams } from "react-router-dom";
import { NextArrow, PrevArrow } from "~/styles/slider";
import { useDispatch, useSelector } from "react-redux";
import { ProductsAction } from "~/redux/products/actions";
import PaginationCustomize from "~/components/Pagination";
import { selectorProducts } from "~/redux/products/reducer";
import React, { Fragment, useEffect, useState } from "react";
import { default as SliderMaterial } from "@mui/material/Slider";
import { convertURLParamsToCategory } from "./helpers/convertURLParamsToCategory";
import axiosInstance from "~/utils/axiosInstance";

const Products = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(
    Number(new URLSearchParams(window.location.search).get("page")) || 1
  );
  const [isPending, setPending] = useState(false);
  const [brandParams, setBrandParams] = useState(
    new URLSearchParams(window.location.search).get("brand")
  );
  const dispatch = useDispatch();
  const current = useParams().category; // get category of current page

  const products = useSelector(selectorProducts);

  const category = convertURLParamsToCategory(current);

  const fetchProducts = async (category) => {
    setPending(true);

    const response = await axiosInstance({
      method: "post",
      url: "/client/products",
      data: { category, page, brandParams },
    });

    dispatch(
      ProductsAction(
        response.data.category,
        response.data.countPage,
        response.data.currentPage,
        response.data.countProducts,
        response.data.data,
        response.data.limit
      )
    );

    setPending(false);
  };

  useEffect(() => {
    window.scrollTo(0, 357);

    switch (current) {
      case "dien-thoai":
        // Nếu trong redux chưa có fetch dữ liệu -> fetch()
        if (!products.dienthoai.payload[`page-${page}`])
          fetchProducts("Điện thoại");

        // Đã có rồi thì lấy set lại
        setData(products.dienthoai);

        break;

      case "tablet":
        if (!products.tablet.payload[`page-${page}`]) fetchProducts("Tablet");
        setData(products.tablet);
        break;

      case "laptop":
        if (!products.laptop.payload[`page-${page}`]) fetchProducts("Laptop");
        setData(products.laptop);
        break;

      case "tai-nghe":
        if (!products.tainghe.payload[`page-${page}`])
          fetchProducts("Tai nghe");
        setData(products.tainghe);
        break;

      case "dong-ho":
        if (!products.dongho.payload[`page-${page}`]) fetchProducts("Đồng hồ");
        setData(products.dongho);
        break;

      case "pc":
        if (!products.pc.payload[`page-${page}`]) fetchProducts("Pc");
        setData(products.pc);
        break;

      case "sim":
        if (!products.sim.payload[`page-${page}`]) fetchProducts("Sim");
        setData(products.sim);
        break;

      case "may-giat":
        if (!products.maygiat.payload[`page-${page}`])
          fetchProducts("Máy giặt");
        setData(products.maygiat);
        break;

      case "tivi":
        if (!products.tivi.payload[`page-${page}`]) fetchProducts("Tivi");
        setData(products.tivi);
        break;

      case "tu-lanh":
        if (!products.tulanh.payload[`page-${page}`]) fetchProducts("Tủ lạnh");
        setData(products.tulanh);
        break;

      case "loa":
        if (!products.loa.payload[`page-${page}`]) fetchProducts("Loa");
        setData(products.loa);
        break;

      case "quat-dieu-hoa":
        if (!products.quatdieuhoa.payload[`page-${page}`])
          fetchProducts("Quạt điều hòa");
        setData(products.quatdieuhoa);
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, products, current, brandParams]);

  useEffect(() => {
    window.scrollTo(0, 357);
    fetchProducts(convertURLParamsToCategory(current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandParams]);

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
            <ListBrands category={category} setBrandParams={setBrandParams} />
          </Box>

          {/*  */}
          <Grid container spacing={2}>
            <Grid item xs={2.5}>
              {/* Danh muc */}
              <SectionCategories
                category={category}
                setPage={setPage}
                brandParams={brandParams}
                setBrandParams={setBrandParams}
              />

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
                      ) : data.countProducts > 0 ? (
                        <Typography sx={{ fontWeight: 500 }}>
                          {`${data.countProducts} ${data.category}`}
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
                    {data &&
                      data.isFetch &&
                      data.payload &&
                      data.payload[`page-${page}`] &&
                      data.payload[`page-${page}`].map((item, index) => {
                        return (
                          <Grid item xs={3} key={index}>
                            <Card product={item} />
                          </Grid>
                        );
                      })}
                  </Grid>

                  {data.countPage > 1 && (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      marginTop={5}
                    >
                      <PaginationCustomize
                        page={page}
                        setPage={setPage}
                        countProducts={data.countProducts}
                        limit={data.limit}
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

export const ListBrands = ({ category, setBrandParams }) => {
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      let response = await axiosInstance({
        method: "post",
        url: "/client/productDetails/sectionBrands",
        data: { category },
      });

      setBrands(response.data.data);
    };

    fetch();
  }, [category]);

  const handleClick = (brand) => {
    const addOrUpdateURLParams = (key, value) => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, "", newRelativePathQuery);
    };

    addOrUpdateURLParams("brand", brand);

    const setView = () => {
      const view = async () => {
        await axiosInstance({
          method: "post",
          url: "/client/products/setView",
          data: { brand },
        });
      };

      view();
    };

    setView();

    setBrandParams(brand);
  };

  return (
    <Box>
      {Array.isArray(brands) && brands.length > 0 && (
        <Container maxWidth="lg" disableGutters>
          <Grid container spacing={2}>
            {brands.map((item, index) => (
              <Grid item xs={1.5} key={index}>
                <Button
                  onClick={() => handleClick(item.name)}
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
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
};

const SectionCategories = ({
  category,
  setPage,
  brandParams,
  setBrandParams,
}) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance("/client/productDetails/sectionCategories");

      setCategories(response.data.data);
    };

    fetch();
  }, []);

  const handleClick = () => {
    setPage(1);
    setBrandParams(null);
  };

  return (
    <Box className="box categories">
      <Typography className="title">Danh mục</Typography>
      <Stack className="list">
        {Array.isArray(categories) &&
          categories.map((item, index) => {
            return (
              <Link to={item?.link} key={index} onClick={handleClick}>
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
