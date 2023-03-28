import {
  formatCost,
  formatDiscount,
  formatPrice,
  formatVND,
} from "~/helper/format";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  Grid,
  Popover,
  styled,
  Typography,
} from "@mui/material";
import { PF } from "~/__variables";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Brand, Search } from "~/components/Header";
import AccountMenu from "~/components/Header/AccountMenu";

const Cart = () => {
  let [count, setCount] = useState(1);

  const handleIncrease = () => {
    setCount(count);
  };

  const handleDecrease = () => {
    setCount(count);
  };

  return (
    <Root>
      <HeaderCart>
        <Top>
          <Container maxWidth="lg" disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box className="left">
                <Link>
                  <Typography>Kênh thương hiệu</Typography>
                </Link>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Link>
                  <Typography>Tải ứng dụng</Typography>
                </Link>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography>Kết nối</Typography>
                  <Link
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FacebookOutlinedIcon />
                  </Link>
                  <Link
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <InstagramIcon />
                  </Link>
                </Box>
              </Box>

              <Box className="right">
                <Box className="item">
                  <NotificationsOutlinedIcon />
                  <Typography>Thông báo</Typography>
                </Box>
                <Box className="item">
                  <HelpOutlineOutlinedIcon />
                  <Typography>Hỗ trợ</Typography>
                </Box>
                <Box className="item">
                  <LanguageOutlinedIcon />
                  <Typography>Tiếng việt</Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Top>

        <Bottom sx={{ backgroundColor: "#fff", padding: "30px 0" }}>
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Brand />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{
                    margin: "auto 20px",
                    height: "30px",
                    borderWidth: "1px",
                    borderColor: "var(--color-main)",
                  }}
                />
                <Typography
                  sx={{
                    color: "var(--color-main)",
                    fontSize: "24px",
                  }}
                >
                  Giỏ hàng
                </Typography>
              </Box>

              <Search />

              <User />
            </Box>
          </Container>
        </Bottom>
      </HeaderCart>

      <ContentCart>
        <Container maxWidth="lg" disableGutters>
          <Box
            sx={{
              borderRadius: "5px",
              backgroundColor: "#fff",
              margin: "30px 24px",
            }}
          >
            <Option>
              {/* title */}
              <Box className="title col">
                <Box className="col-0">
                  <Checkbox />
                </Box>
                <Box className="col-1">
                  <Typography>Sản phẩm</Typography>
                </Box>
                <Box className="col-2">
                  <Typography>Đơn giá</Typography>
                </Box>
                <Box className="col-3">
                  <Typography>Số lượng</Typography>
                </Box>
                <Box className="col-4">
                  <Typography>Số tiền</Typography>
                </Box>
                <Box className="col-5">
                  <Typography>Thao tác</Typography>
                </Box>
              </Box>

              {/* Content */}
              <Box className="content">
                {dummyItem.map((item, index) => {
                  return (
                    <Box className="item col" key={index}>
                      {/* CheckBox */}
                      <Box className="col-0">
                        <Checkbox />
                      </Box>

                      {/* Sản phẩm */}
                      <Box className="col-1">
                        <Grid container spacing={1} flexDirection="row">
                          <Grid item xs={4}>
                            <img
                              src={PF + "/assets/products/2.webp"}
                              alt=""
                              width="100%"
                            />
                          </Grid>
                          <Grid item xs>
                            <Typography>
                              Gigabyte AERO 16 XE5 73VN938AH
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Đơn giá */}
                      <Box className="col-2 field-bill">
                        <Typography
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {formatCost(formatVND(item?.price))}
                          {formatDiscount(24)}
                        </Typography>
                        <Typography>
                          {formatVND(formatPrice(item?.price, item?.discount))}
                        </Typography>
                      </Box>

                      {/* Số lượng */}
                      <Box className="col-3">
                        <Box sx={styles}>
                          <Box className="btn" onClick={handleDecrease}>
                            -
                          </Box>
                          <Box className="count">{item?.count}</Box>
                          <Box className="btn" onClick={handleIncrease}>
                            +
                          </Box>
                        </Box>
                      </Box>

                      {/* Số tiền */}
                      <Box className="col-4">
                        <Typography sx={{ color: "crimson" }}>
                          {formatVND(
                            formatPrice(item?.price, item.discount) * item.count
                          )}
                        </Typography>
                      </Box>

                      {/* Thao tác */}
                      <Box className="col-5">
                        <Typography
                          sx={{
                            color: "crimson",
                            cursor: "pointer",
                          }}
                        >
                          Xóa
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {/* Payment */}
              <Payment>
                <Box
                  sx={{
                    padding: "10px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Checkbox />
                    <Typography sx={{ textTransform: "capitalize" }}>
                      Chọn tất cả (1)
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Typography>
                      Tổng thanh toán (0 sản phẩm):{" "}
                      <Typography
                        variant="span"
                        sx={{
                          color: "crimson",
                          fontWeight: 600,
                          fontSize: "1.2rem",
                        }}
                      >
                        {formatVND(30000000)}
                      </Typography>
                    </Typography>

                    <Box
                      sx={{
                        marginLeft: 3,
                        backgroundColor: "crimson",
                        border: "1px solid crimson",
                        borderRadius: "5px",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 30px",
                        cursor: "pointer",
                        boxShadow: "0 1px 5px 1px rgba(0, 0, 0, 0.25)",
                        transition: "all .2s ease-in-out",

                        ":hover": {
                          boxShadow: "0 1px 5px 5px rgba(0, 0, 0, 0.25)",
                        },
                      }}
                    >
                      Mua ngay
                    </Box>
                  </Box>
                </Box>
              </Payment>
            </Option>
          </Box>
        </Container>
      </ContentCart>
    </Root>
  );
};

export default Cart;

const User = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "mouse-over-popover" : undefined;

  return (
    <Box
      aria-owns={id}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <AccountMenu />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableRestoreFocus
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        // onClose={handlePopoverClose}
        sx={{
          pointerEvents: "none",
          // top: "-20px",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
};

const dummyItem = [
  { image: "", name: "", price: "12000000", discount: "24", count: "2" },
  { image: "", name: "", price: "12000000", discount: "12", count: "1" },
  { image: "", name: "", price: "12000000", discount: "8", count: "4" },
  { image: "", name: "", price: "12000000", discount: "36", count: "3" },
];

const Payment = styled(Box)(() => ({
  borderRadius: "0 0 5px 5px",
  boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#fff",
  position: "sticky",
  bottom: 0,
  zIndex: 2,
}));

const Option = styled(Box)(() => ({
  boxShadow: "0 0px 1px 0px rgba(0,0,0.25)",
  borderRadius: "5px",

  ".col": {
    width: "100%",

    ".col-1": {
      width: "40%",
    },
    ".col-2": {
      width: "15%",
      textAlign: "center",
    },
    ".col-3": {
      width: "15%",
      textAlign: "center",
    },
    ".col-4": {
      width: "15%",
      textAlign: "center",
    },
    ".col-5": {
      width: "15%",
      textAlign: "center",
    },
  },

  ".title": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
    padding: "0 24px",
    borderBottom: "1px solid #ccc",
    borderRadius: "5px 5px 0 0",
    boxShadow: "0 1px 5px rgba(0,0,0,0.125)",
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 3,

    p: {
      opacity: "0.7",
    },
  },

  ".content": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    ".item": {
      padding: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "1px solid #ccc",
    },
  },
}));

const ContentCart = styled(Box)(() => ({
  paddingBottom: 4,
}));

const Root = styled(Box)(() => ({
  position: "relative",
}));

const HeaderCart = styled(Box)(() => ({
  boxShadow: "0 1px 0 rgba(0, 0, 0, 0.125)",
}));

const Top = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  backgroundColor: "var(--color-main)",

  "p, a": {
    fontSize: "14px",
    color: "#fff",
  },

  svg: {
    color: "#fff",
    fontSize: "18px",
    margin: "0 3px",
  },

  a: {
    ":hover": {
      "p, svg": {
        color: "#c1c1c1",
      },
    },
  },

  hr: {
    height: "12px",
    margin: "auto 10px",
    borderColor: "#fff",
  },

  ".left": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  ".right": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    ".item": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 7px",
      textTransform: "capitalize",
      cursor: "pointer",
    },
  },
}));

const Bottom = styled(Box)(() => ({}));

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  height: "40px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "120px",
  margin: "0 auto",

  ".btn": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    aspectRatio: "1/1",
    fontSize: "30px",
    cursor: "pointer",
    color: "#555",
  },

  ".count": {
    flex: 1,
    borderLeft: "1px solid #ccc",
    borderRight: "1px solid #ccc",
  },
};
