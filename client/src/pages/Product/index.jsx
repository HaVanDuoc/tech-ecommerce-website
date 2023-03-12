import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  FormLabel,
  Grid,
  Link,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { PF } from "~/__variables";
import { Stack } from "@mui/system";
import { formatCost, formatVND } from "~/helper/format";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Styled = styled(Box)(() => ({}));
const Price = styled(Box)(() => ({}));
const Cost = styled(Box)(() => ({}));
const Discount = styled(Box)(() => ({}));
const Count = styled(Box)(() => ({}));

const breadcrumbs = [
  <Link underline="hover" key="1" href="/">
    Tech
  </Link>,
  <Link underline="hover" key="2" href="/dien-thoai">
    Điện thoại
  </Link>,
  <Typography key="3" color="text.primary">
    Breadcrumb
  </Typography>,
];

const Product = () => {
  return (
    <Styled>
      <Container maxWidth="lg" disableGutters>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            minHeight: "50px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {breadcrumbs}
        </Breadcrumbs>

        <Grid container sx={{ backgroundColor: "#fff", padding: 2 }}>
          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={PF + "/assets/products/xiaomi-11t-256gb-(18).jpg"}
              alt=""
              width={400}
            />
          </Grid>
          <Grid item xs={7} paddingLeft={5}>
            <Typography
              fontSize={22}
              fontWeight={400}
              color="var(--color-text)"
            >
              For Iphone 13 12 Pro Max Xs Max X Xr 7 8 6 6s Plus 12 Mini Se 2020
              Phim cường lực 9D bảo vệ cho điện thoại
            </Typography>

            <Stack flexDirection="row" height={40}>
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography fontSize={16}>4.0 &nbsp;</Typography>
                <Rating name="read-only" value={4} readOnly size="small" />
              </Stack>

              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ marginLeft: 2, marginRight: 2 }}
              />

              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography fontSize={16}>234 &nbsp;</Typography>
                <FormLabel fontSize={16}>Đánh giá</FormLabel>
              </Stack>

              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ marginLeft: 2, marginRight: 2 }}
              />

              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography fontSize={16}>3k6 &nbsp;</Typography>
                <FormLabel fontSize={16}>Đã bán</FormLabel>
              </Stack>
            </Stack>

            <Container
              disableGutters
              sx={{
                background:
                  "linear-gradient(100deg, rgb(255, 66, 78), rgb(253, 130, 10))",
                padding: 2,
                color: "#fff",
                borderRadius: 2,
                marginTop: "5px",
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="start"
                alignItems="center"
                sx={{
                  div: {
                    marginRight: 2,
                  },
                }}
              >
                <Cost>
                  <FormLabel>{formatCost(formatVND(2000000))}</FormLabel>
                </Cost>

                <Price
                  sx={{
                    fontSize: "34px",
                  }}
                >
                  {formatVND(3000000)}
                </Price>

                <Discount
                  sx={{
                    padding: "1px 16px",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    color: "rgb(255, 66, 78)",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {`giảm ${20}%`}
                </Discount>
              </Box>
            </Container>

            <Count></Count>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                margin: "30px 0",
              }}
            >
              <Button variant="outlined" sx={{ height: 50, marginRight: 2 }}>
                <ShoppingCartOutlinedIcon />
                <Typography>Thêm vào giỏ hàng</Typography>
              </Button>
              <Button variant="contained" sx={{ height: 50 }}>
                Mua ngay
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Styled>
  );
};

export default Product;
