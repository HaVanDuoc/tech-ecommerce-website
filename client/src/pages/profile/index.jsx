import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { PF } from "~/__variables";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountMenu from "~/components/Header/AccountMenu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import Tabs from "./Tabs";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";
import {
  FormatFullName,
  formatCost,
  formatPrice,
  formatVND,
} from "~/helper/format";
import dayjs from "dayjs";
import axiosInstance from "~/utils/axiosInstance";

const Profile = () => {
  const currentUser = useSelector(selectorCurrentUser);

  return (
    <Fragment>
      <HeaderProfile currentUser={currentUser} />
      <Background />
      <InfoBar
        countPayment={
          currentUser.isLogged && currentUser.user.data.transactionVolume
        }
        avatar={currentUser.isLogged && currentUser.user.data.avatar}
        firstName={currentUser.isLogged && currentUser.user.data.firstName}
        middleName={currentUser.isLogged && currentUser.user.data.middleName}
        lastName={currentUser.isLogged && currentUser.user.data.lastName}
      />
      <Feed currentUser={currentUser} />
    </Fragment>
  );
};

export default Profile;

const Feed = ({ currentUser }) => {
  const [fetch, setFetch] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [tab, setTab] = useState(null);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setPending(true);

      const response = await axiosInstance({
        method: "post",
        url: "/client/profile/order",
        data: {
          tab,
          user_id: currentUser.isLogged && currentUser.user.data.id,
        },
      });

      setFetch(response.data);

      setPending(false);
    };

    fetch();
  }, [currentUser, tab, reFetch]);

  const OrderList = styled(Box)(() => ({
    marginTop: 16,
  }));

  const OrderItem = styled(Box)(() => ({}));

  const handleDestroyOrder = (order_details_id) => {
    const fetch = async () => {
      await axiosInstance({
        method: "post",
        url: "/client/profile/destroyOrder",
        data: { order_details_id },
      });
    };

    fetch();

    setReFetch(!reFetch);
  };

  return (
    <Box
      sx={{
        position: "relative",
        margin: 2,
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Box position="relative">
          <Box
            position="sticky"
            top={82}
            sx={{ backgroundColor: "#f0f2f5", zIndex: 2 }}
          >
            <Tabs tab={tab} setTab={setTab} />
          </Box>

          {/* Search */}
          {fetch.data && fetch.data.length ? (
            <Box
              sx={{
                width: "100%",
                marginTop: 2,
                marginBottom: 2,
                backgroundColor: "#e7e7e7",

                ":hover": {
                  ".icon": {
                    "& svg": {
                      color: "inherit",
                    },
                  },
                },

                ".icon": {
                  width: 45,
                  height: 45,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  "& svg": {
                    color: "#666",
                  },
                },

                input: {
                  flex: 1,
                  border: "none",
                  backgroundColor: "transparent",
                  height: 45,
                  lineHeight: 20,
                  fontSize: 15,

                  "::placeholder": {
                    color: "#666",
                  },
                },
              }}
            >
              <Stack
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Box className="icon">
                  <SearchOutlinedIcon />
                </Box>
                <input
                  type="text"
                  placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản Phẩm"
                />
              </Stack>
            </Box>
          ) : (
            <Fragment />
          )}

          {isPending ? (
            <Loading />
          ) : fetch.data && fetch.data.length ? (
            <OrderList>
              {fetch &&
                fetch.data &&
                fetch.data.map((item, index) => (
                  <OrderItem key={index}>
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        padding: 2,
                        marginTop: 2,
                        marginBottom: 2,
                        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        marginBottom={2}
                      >
                        <Box>
                          <Typography variant="span" color="#666" fontSize={14}>
                            Đơn hàng
                          </Typography>{" "}
                          <Typography
                            variant="span"
                            sx={{ color: "dodgerblue", cursor: "pointer" }}
                          >
                            {item?.code}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            "& span": {
                              color: "#666",
                              fontSize: "14px",
                            },
                          }}
                        >
                          <Typography variant="span">Đặt ngày</Typography>{" "}
                          <Typography variant="span">
                            {String(
                              dayjs(item?.createdAt).format("DD/MM/YYYY h:mm")
                            )}
                          </Typography>{" "}
                          <Typography
                            variant="span"
                            color="crimson !important"
                            fontWeight={500}
                          >
                            {item.status}
                          </Typography>
                        </Box>
                      </Stack>

                      <Box display="flex" flexWrap="wrap">
                        {fetch.data[index] &&
                          fetch.data[index].orderItem.map((item, index) => (
                            <Stack
                              key={index}
                              flexDirection="row"
                              sx={{
                                flex: 1,
                                minWidth: "33%",
                                marginTop: 2,
                                marginBottom: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  border: "1px solid #ccc",
                                  padding: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",

                                  "& img": {
                                    width: 70,
                                  },
                                }}
                              >
                                <img
                                  src={JSON.parse(item.image)[0].base64}
                                  alt=""
                                />
                              </Box>

                              <Stack
                                flexDirection="column"
                                marginLeft={2}
                                sx={{
                                  color: "#666",
                                }}
                              >
                                <Typography>{item.name_product}</Typography>
                                <Typography>{`x${item.quantity}`}</Typography>
                                <Stack
                                  flexDirection="row"
                                  justifyContent="start"
                                  alignItems="center"
                                >
                                  <Typography variant="span" marginRight={1}>
                                    {formatCost(item.price)}
                                  </Typography>
                                  <Typography
                                    variant="span"
                                    color="crimson"
                                    fontWeight={500}
                                  >
                                    {formatPrice(item.price, item.discount)}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Stack>
                          ))}
                      </Box>

                      <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          borderTop: "1px solid #ddd",
                          borderBottom: "1px solid",
                          borderBottomColor: `${
                            item.status === "Chờ xác nhận" ||
                            item.status === "Đã hủy" ||
                            item.status === "Đã giao"
                              ? "#ddd"
                              : "#fff"
                          }`,
                          color: "#666",
                          fontSize: "14px",
                          lineHeight: "40px",
                        }}
                      >
                        <Box>
                          <Typography variant="span">
                            {item.orderItem.length}
                          </Typography>{" "}
                          <Typography variant="span">sản phẩm</Typography>
                        </Box>

                        <Box>
                          <Typography variant="span">
                            Tổng thanh toán:{" "}
                          </Typography>{" "}
                          <Typography
                            variant="span"
                            color="crimson"
                            fontSize="16px"
                            fontWeight={500}
                          >
                            {formatVND(item.total)}
                          </Typography>
                        </Box>
                      </Stack>

                      {item.status === "Chờ xác nhận" ||
                      item.status === "Đã hủy" ? (
                        <Stack justifyContent="center" alignItems="center">
                          <Box
                            onClick={() => handleDestroyOrder(item.id)}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid",
                              borderColor: `${
                                item.status !== "Đã hủy" ? "#ccc" : "red"
                              }`,
                              backgroundColor: `${
                                item.status !== "Đã hủy" ? "#ccc" : "red"
                              }`,
                              color: "#fff",
                              margin: 1,
                              padding: "5px 50px",
                              borderRadius: "5px",
                              cursor: "pointer",
                              transition: "all .3s ease",

                              ":hover": {
                                backgroundColor: `${
                                  item.status !== "Đã hủy" ? "#aaa" : "#d40a0a"
                                }`,
                              },
                            }}
                          >
                            {item.status !== "Đã hủy"
                              ? "Xác nhận hủy"
                              : "Mua lại"}
                          </Box>
                        </Stack>
                      ) : (
                        // Tab Đã giao sẽ có button đánh giá
                        item.status === "Đã giao" && (
                          <Stack justifyContent="center" alignItems="center">
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1px solid",
                                borderColor: "dodgerblue",
                                backgroundColor: "dodgerblue",
                                color: "#fff",
                                margin: 1,
                                padding: "5px 50px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "all .3s ease",

                                ":hover": {
                                  backgroundColor: "#0e71d2",
                                },
                              }}
                            >
                              Đánh giá
                            </Box>
                          </Stack>
                        )
                      )}
                    </Box>
                  </OrderItem>
                ))}
            </OrderList>
          ) : (
            <NoOrders />
          )}
        </Box>
      </Container>
    </Box>
  );
};

const InfoBar = ({ countPayment, avatar, firstName, middleName, lastName }) => {
  return (
    <Box
      sx={{
        boxShadow: "0 0 5px 1px rgba(0,0,0,0.25)",
        position: "relative",
        height: "60px",
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Box sx={{ position: "relative", height: 60, marginRight: 1 }}>
            <Box sx={{ position: "relative", top: "-100px" }}>
              <Avatar src={avatar} sx={{ width: 120, height: 120 }} />
              <Avatar
                src={PF + "/assets/profile/cover-avatar.png"}
                sx={{
                  width: 140,
                  height: 140,
                  position: "absolute",
                  top: -10,
                  left: -10,
                }}
              />
            </Box>
          </Box>

          <Stack sx={{ transform: "translateY(-60px)", marginLeft: 1 }}>
            <Box sx={{ height: 60, display: "flex", alignItems: "center" }}>
              <Typography fontSize={20} color="#fff">
                {FormatFullName(firstName, middleName, lastName)}
              </Typography>
            </Box>

            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "60px",

                ".item": {
                  ".value": {
                    fontWeight: 500,
                    fontSize: 18,
                  },

                  ".name": {
                    color: "#666",
                    fontSize: 14,
                  },

                  ".divider": {
                    color: "#ddd",
                  },
                },
              }}
            >
              {/* Tổng thanh toán */}
              <Box className="item">
                <Typography variant="span" className="value">
                  {formatVND(countPayment)}
                </Typography>{" "}
                <Typography
                  variant="span"
                  textTransform="capitalize"
                  className="name"
                >
                  Đã thanh toán
                </Typography>
                <Typography variant="span" margin="0 10px" className="divider">
                  /
                </Typography>
              </Box>
              {/* Người theo dõi */}
              <Box className="item">
                <Typography variant="span" className="value">
                  30
                </Typography>{" "}
                <Typography
                  variant="span"
                  textTransform="capitalize"
                  className="name"
                >
                  Người theo dõi
                </Typography>
                <Typography variant="span" margin="0 10px" className="divider">
                  /
                </Typography>
              </Box>
              {/* Đang theo dõi */}
              <Box className="item">
                <Typography variant="span" className="value">
                  8
                </Typography>{" "}
                <Typography
                  variant="span"
                  textTransform="capitalize"
                  className="name"
                >
                  Đang theo dõi
                </Typography>
                <Typography variant="span" margin="0 10px" className="divider">
                  /
                </Typography>
              </Box>
              {/* Đánh giá */}
              <Box className="item">
                <Typography variant="span" className="value">
                  56
                </Typography>{" "}
                <Typography
                  variant="span"
                  textTransform="capitalize"
                  className="name"
                >
                  Đánh giá
                </Typography>
                <Typography variant="span" margin="0 10px" className="divider">
                  /
                </Typography>
              </Box>
              {/* Được thích */}
              <Box className="item">
                <Typography variant="span" className="value">
                  257
                </Typography>{" "}
                <Typography
                  variant="span"
                  textTransform="capitalize"
                  className="name"
                >
                  Được thích
                </Typography>
              </Box>
            </Stack>
          </Stack>

          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: -40,
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              flexDirection: "column",
              transition: "all .3s ease",

              ":hover": {
                ".edit": {
                  backgroundColor: "#6d86ea",
                  color: "#fff",
                },
                ".option": {
                  display: "block",
                },
              },
            }}
          >
            <Box
              className="edit"
              sx={{
                width: 130,
                backgroundColor: "#e1e7ff",
                padding: "3px 20px",
                borderRadius: "15px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Typography fontSize={14} textTransform="capitalize">
                Chỉnh sửa
              </Typography>
              <ArrowDropDownIcon />
            </Box>

            <Box
              className="option"
              sx={{
                display: "none",
                backgroundColor: "#fff",
                padding: "15px 8px",
                marginTop: 1,
                borderRadius: 1,
                boxShadow: "0 0 1px 1px rgba(0,0,0,0.25)",
              }}
            >
              <Link to="/profile/edit">
                <Box
                  sx={{
                    padding: "3px 10px",
                    ":hover": {
                      backgroundColor: "#eee",
                      borderRadius: 1,
                      cursor: "pointer",
                      transition: "all .3s ease",

                      "& p": {
                        color: "#6d89fa",
                      },
                    },
                  }}
                >
                  <Typography fontSize={14} color="#333">
                    Hoàn thiện thông tin cá nhân
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export const Background = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "300px",
        overflow: "hidden",

        "&:after": {
          content: `""`,
          display: "block",
          position: "absolute",
          top: 0,
          width: "100%",
          height: "300px",
          boxShadow: "inset 0 0 50px 50px rgba(0, 0, 0, 0.4)",
        },

        "& img": {
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          boxShadow: "inset 0 0 20px 50px rgba(0, 0, 0, 1)",
        },
      }}
    >
      <img
        src={
          `${PF}/assets/profile/bg.webp`
          // `${PF}/assets/profile/default-cover-photo.webp`
        }
        alt="background"
      />
    </Box>
  );
};

export const HeaderProfile = ({ currentUser }) => {
  const [nav, setNav] = useState(false);

  const Search = ({ nav }) => {
    return (
      <Box
        className="header_profile"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          background: `${
            nav ? "rgb(247 247 247 / 85%)" : "rgba(0, 0, 0, 0.4)"
          }`,
          width: "480px",
          borderRadius: "20px",
          overflow: "hidden",
          border: `${
            nav
              ? "1px solid rgba(255, 255, 255, 0.85)"
              : "1px solid rgba(0, 0, 0, 0.4)"
          }`,
          boxShadow: `${nav ? "0 0 1px 1px rgba(0,0,0,0.1)" : "none"}`,
          transition: "all .3s ease",

          ":hover": {
            border: `${
              nav
                ? "1px solid var(--color-main)"
                : "1px solid rgba(255, 255, 255, 0.85)"
            }`,
          },

          "& input": {
            flex: 1,
            height: "35px",
            border: "none",
            backgroundColor: "transparent",
            padding: "0 50px 0 15px",
            color: `${nav ? "#666" : "rgba(255, 255, 255, 0.85)"}`,

            "::placeholder": {
              color: `${nav ? "#666" : "rgba(255, 255, 255, 0.85)"}`,
            },
          },

          ".icon": {
            width: "35px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: `${nav ? "#666" : "rgba(255, 255, 255, 0.85)"}`,
          },
        }}
      >
        <input placeholder="Bạn đang tìm gì?" />
        <Box className="icon">
          <SearchOutlinedIcon fontSize="small" />
        </Box>
      </Box>
    );
  };

  const changeHeader = () => {
    window.scrollY >= 300 ? setNav(true) : setNav(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeHeader);
    return () => {
      window.addEventListener("scroll", changeHeader);
    };
  }, []);

  return (
    <Box
      onScroll={changeHeader}
      sx={{
        position: "fixed",
        top: 0,
        display: "flex",
        width: "100%",
        color: "#fff",
        zIndex: 99,
        padding: 2,

        backgroundColor: `${nav && "#fff"}`,
        boxShadow: `${nav && "0 0 1px 1px rgba(0, 0, 0, 0.25)"}`,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          lineHeight={5}
        >
          {/* Brand */}
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              color={nav && "var(--color-main)"}
              fontSize={30}
              fontWeight={600}
              marginRight={3}
              sx={{ cursor: "pointer" }}
            >
              Tech
            </Typography>

            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                ".nav": {
                  color: `${nav ? "#888" : "#fff"}`,
                  margin: 1,
                  cursor: "pointer",
                  position: "relative",

                  "&:after": {
                    content: `""`,
                    backgroundColor: `${nav ? "var(--color-main)" : "#fff"}`,
                    height: "5px",
                    width: "20px",
                    borderRadius: "2.5px",
                    position: "absolute",
                    bottom: "-20%",
                    left: "50%",
                    transform: "translate(-50%, 20%)",
                    zIndex: -1,
                    display: "none",
                  },

                  ":hover": {
                    color: `${nav ? "var(--color-main)" : "#fff"}`,

                    ":after": {
                      display: "block",
                    },
                  },
                },
              }}
            >
              <Link to="/" className="link">
                <Typography
                  fontWeight={600}
                  textTransform="capitalize"
                  className="nav"
                >
                  Trang chủ
                </Typography>
              </Link>
              <Typography
                fontWeight={600}
                textTransform="capitalize"
                className="nav"
              >
                Diễn đàn
              </Typography>
            </Stack>
          </Stack>

          {/* search */}
          <Search nav={nav} />

          {/* item */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",

              ".item": {
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",

                "& a": {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },

                "& svg": {
                  color: `${nav && "#666"}`,
                },
              },
            }}
          >
            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Box className="item">
                <Link to="/cart" className="link">
                  <ShoppingBasketOutlinedIcon />
                </Link>
              </Box>
              <Box className="item">
                <NotificationsNoneOutlinedIcon />
              </Box>
              <Box>
                <AccountMenu />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

const Loading = () => {
  return (
    <Box
      sx={{
        minHeight: 500,
        backgroundColor: "#fff",
        marginTop: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        "& img": {
          width: "150px",
        },
      }}
    >
      <CircularProgress />
      <Typography fontSize={18} fontWeight={500} color="#666">
        Đang xử lý...
      </Typography>
    </Box>
  );
};

const NoOrders = () => {
  return (
    <Box
      sx={{
        minHeight: 500,
        backgroundColor: "#fff",
        marginTop: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        "& img": {
          width: "150px",
        },
      }}
    >
      <img src={PF + "/assets/profile/icon-no-order.png"} alt="" />
      <Typography fontSize={18} fontWeight={500} color="#666">
        Chưa có đơn hàng
      </Typography>
    </Box>
  );
};
