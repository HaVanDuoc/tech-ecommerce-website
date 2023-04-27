import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputBase,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";
import { Recent } from "~/redux/Search/action";
import { selectorSearch } from "~/redux/Search/reducer";
import SearchIcon from "@mui/icons-material/Search";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import CloseIcon from "@mui/icons-material/Close";

export const Search = () => {
  const search = useSelector(selectorSearch);
  const currentUser = useSelector(selectorCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const recent = async () => {
      const response = await axios({
        method: "post",
        url: "/client/search/recent",
        data: {
          user_id: currentUser.isLogged ? currentUser.user.data.id : null,
        },
      });
      dispatch(Recent(response.data));
    };

    recent();
  }, [dispatch, currentUser]);

  // console.log("search", search);

  const handleChange = (e) => {
    console.log("e.target.value", e.target.value);
  };

  const handleClick = () => {
    document.querySelector("#auto-complete").style.display = "block";

    // document.querySelector("#input-search").addEventListener("focus", () => {
    //   document.querySelector("#auto-complete").style.display = "none";
    // });
  };

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

  const ResultSearch = styled(Box)(() => ({}));
  const ResultItem = styled(Box)(() => ({}));

  return (
    <SearchWrap>
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

      <ResultSearch
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
          maxHeight: 500,
          backgroundColor: "#fff",
          position: "absolute",
          top: 50,
          paddingTop: 1,
          paddingBottom: 3,
          borderRadius: 2,
          boxShadow: "0 0 3px 1px rgba(0,0,0,0.2)",
          zIndex: 2,
          display: "none",
        }}
      >
        {search.isPending ? (
          search.recent.length ? (
            search.recent.map((item, index) => {
              return (
                <Fragment>
                  <Stack paddingLeft={3} paddingRight={3} paddingBottom={1}>
                    <Typography color="#444" fontSize={14} fontWeight={500}>
                      Tìm kiếm gần đây
                    </Typography>
                  </Stack>
                  <ResultItem
                    key={index}
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      paddingTop: 1,
                      paddingBottom: 1,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      ":hover": {
                        backgroundColor: "#ddd",

                        ".result p": {
                          color: "var(--color-main)",
                        },
                      },
                    }}
                  >
                    <Stack flexDirection="row" className="result">
                      <RestoreOutlinedIcon
                        sx={{ marginRight: 1, color: "#888" }}
                      />
                      <Typography>sdfsdf</Typography>
                    </Stack>
                    <IconButton>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </ResultItem>
                </Fragment>
              );
            })
          ) : (
            <Stack justifyContent="center" alignItems="center" paddingTop={2}>
              <Typography color="#333">
                Không có tìm kiếm nào gần đây
              </Typography>
            </Stack>
          )
        ) : (
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        )}
      </ResultSearch>
    </SearchWrap>
  );
};
