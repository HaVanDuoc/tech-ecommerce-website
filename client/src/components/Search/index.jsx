import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";
import { Fragment, useEffect, useState } from "react";
import { Recent } from "~/redux/Search/action";
import styled from "@emotion/styled";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import { formatCost, formatDiscount, formatPrice } from "~/helper/format";
import { Link } from "react-router-dom";
import { selectorSearch } from "~/redux/Search/reducer";
import axiosInstance from "~/utils/axiosInstance";

const Search = () => {
  const [suggestion, setSuggestion] = useState(null);
  const currentUser = useSelector(selectorCurrentUser);
  const dispatch = useDispatch();
  const search = useSelector(selectorSearch);

  useEffect(() => {
    const recent = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/client/search/recent",
        data: {
          user_id: currentUser.isLogged ? currentUser.user.data.id : null,
          limit: 6,
        },
      });
      dispatch(Recent(response.data.data));
    };

    recent();
  }, [dispatch, currentUser]);

  const handleChange = (e) => {
    const suggest = async () => {
      const result = await axiosInstance({
        method: "post",
        url: "/client/search/suggest",
        data: { key: e.target.value, limit: 6 },
      });

      setSuggestion(result.data.data);
    };

    suggest();
  };

  const handleClick = () => {
    document.querySelector("#auto-complete").style.display = "block";

    // document.querySelector("#input-search").addEventListener("focus", () => {
    //   document.querySelector("#auto-complete").style.display = "none";
    // });
  };

  return (
    <SearchWrap id="search-bar">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40px",
          height: "40px",
          color: "var(--color-secondary)",
        }}
      >
        <SearchIcon className="icon-search" />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <InputBase
          placeholder="Bạn đang tìm gì?"
          fullWidth
          id="input-search"
          className="input"
          onClick={handleClick}
          onChange={handleChange}
        />
      </Box>

      <Button sx={{ textTransform: "none" }} className="btn-search">
        Tìm kiếm
      </Button>

      <AutoComplete
        suggestion={suggestion}
        recent={search.isPending ? search.recent : []}
        user_id={currentUser.isLogged ? currentUser.user.data.id : null}
      />
    </SearchWrap>
  );
};

export default Search;

const SearchWrap = styled(Box)(() => ({
  position: "relative",
  border: "1px solid #ccc",
  borderRadius: "var(--border-radius)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  margin: "0 20px",
  boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.25)",

  ":hover": {
    ".icon-search": {
      color: "var(--color-main)",
    },
  },

  "& hr": {
    marginRight: "0 !important",
    color: "#ccc",
  },

  ".auto-complete": {
    display: "none",
  },
}));

const AutoComplete = ({ suggestion, recent, user_id }) => {
  const [row, setRow] = useState(1);
  const searchBar = document.querySelector("#search-bar");

  if (searchBar)
    new ResizeObserver(() => {
      let widthSearch = document.querySelector("#search-bar").offsetWidth;
      widthSearch < 500 ? setRow(1) : widthSearch < 850 ? setRow(2) : setRow(3);
    }).observe(searchBar);

  const Suggestion = styled(Box)(() => ({}));
  const Recent = styled(Box)(() => ({}));

  return (
    <Box
      id="auto-complete"
      tabIndex={-1}
      onFocus={() =>
        (document.querySelector("#auto-complete").style.display = "block")
      }
      onBlur={() =>
        (document.querySelector("#auto-complete").style.display = "none")
      }
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        position: "absolute",
        top: 50,
        paddingTop: 2,
        paddingBottom: 3,
        borderRadius: 2,
        boxShadow: "0 0 3px 1px rgba(0,0,0,0.2)",
        display: "none",
        zIndex: 99,

        ".title": {
          padding: "4px 16px",
          backgroundColor: "#eee",
          display: "flex",
          width: "100%",

          "& p": {
            fontSize: 14,
            fontWeight: 500,
            pointerEvents: "none",
          },
        },

        ".container-result": {
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",

          ".item": {
            display: "flex",
            width: `calc(100%/${row})`,
          },
        },
      }}
    >
      {suggestion && (
        <Suggestion className="suggestion">
          <Box className="title">
            <Typography>Gợi ý sản phẩm</Typography>
          </Box>

          <Box className="container-result">
            {suggestion.map((item, index) => {
              const handleClick = () => {
                /* Close auto complete */
                document.querySelector("#auto-complete").style.display = "none";

                /* Save result search */
                const request = async () => {
                  const saveSearch = await axiosInstance({
                    method: "post",
                    url: "/client/search/saveRecent",
                    data: { product_id: item.id, user_id },
                  });

                  saveSearch();
                };

                request();
              };

              return (
                <Box
                  key={index}
                  className="item"
                  sx={{
                    padding: 2,
                    cursor: "pointer",

                    ":hover": {
                      ".name": {
                        color: "dodgerblue",
                      },
                    },
                  }}
                  onClick={handleClick}
                >
                  <Link
                    to={`${item.categoryLink}/${item.name}`}
                    className="link"
                  >
                    <Stack
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        width={80}
                      >
                        <img
                          src={JSON.parse(item.image)[0].base64}
                          alt=""
                          width="100%"
                        />
                      </Stack>

                      <Stack
                        justifyContent="center"
                        alignItems="start"
                        marginLeft={1}
                      >
                        <Box>
                          <Typography className="name">{item.name}</Typography>
                        </Box>
                        <Stack
                          flexDirection="row"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            "& > p": {
                              marginRight: 1,
                            },
                          }}
                        >
                          <Typography color="crimson" fontWeight={500}>
                            {formatPrice(item.price, item.discount)}
                          </Typography>
                          {item.discount && (
                            <Fragment>
                              <Typography>{formatCost(item.price)}</Typography>
                              <Typography fontSize={14}>
                                {formatDiscount(item.discount)}
                              </Typography>
                            </Fragment>
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Suggestion>
      )}

      {recent && (
        <Recent className="suggestion">
          <Box className="title">
            <Typography>Tìm kiếm gần đây</Typography>
          </Box>

          <Box className="container-result">
            {recent.map((item, index) => {
              return (
                <Box
                  key={index}
                  className="item"
                  sx={{
                    padding: 2,
                    cursor: "pointer",

                    ":hover": {
                      ".name": {
                        color: "dodgerblue",
                      },
                    },
                  }}
                >
                  <Link
                    to={`${item.categoryLink}/${item.name}`}
                    className="link"
                  >
                    <Stack
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        width={80}
                      >
                        <img
                          src={JSON.parse(item.image)[0].base64}
                          alt=""
                          width="100%"
                        />
                      </Stack>

                      <Stack
                        justifyContent="center"
                        alignItems="start"
                        marginLeft={1}
                      >
                        <Box>
                          <Typography className="name">{item.name}</Typography>
                        </Box>
                        <Stack
                          flexDirection="row"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            "& p": {
                              marginRight: 1,
                            },
                          }}
                        >
                          <Typography color="crimson" fontWeight={500}>
                            {formatPrice(item.price, item.discount)}
                          </Typography>
                          {item.discount && (
                            <Fragment>
                              <Typography>{formatCost(item.price)}</Typography>
                              <Typography fontSize={14}>
                                {formatDiscount(item.discount)}
                              </Typography>
                            </Fragment>
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Recent>
      )}
    </Box>
  );
};
