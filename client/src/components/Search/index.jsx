import styled from "@emotion/styled"
import SearchIcon from "@mui/icons-material/Search"
import { useDispatch, useSelector } from "react-redux"
import { Fragment, useEffect, useState } from "react"
import { Box, Button, CircularProgress, InputBase, Stack, Typography } from "@mui/material"
import { formatCost, formatDiscount, formatPrice } from "~/helper/format"
import { Link } from "react-router-dom"
import { selectorCurrentUser } from "~/redux/authSlice"
import { requestSearchHeaderRecent, requestSearchHeaderSaveRecent, requestSearchHeaderSuggest } from "~/api"
import { selectorSearchHeader } from "~/redux/searchSlice"

const Search = () => {
    const currentUser = useSelector(selectorCurrentUser)
    const dispatch = useDispatch()
    const stateSearch = useSelector(selectorSearchHeader)

    useEffect(() => {
        if (stateSearch.recent.isFetch) return
        requestSearchHeaderRecent(dispatch, currentUser.isLogged ? currentUser.user.data.id : null)
    }, [dispatch, currentUser, stateSearch])

    const handleChange = (e) => requestSearchHeaderSuggest(dispatch, e)

    const handleClick = () => {
        document.querySelector("#auto-complete").style.display = "block"
    }

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

            <AutoComplete user_id={currentUser.isLogged ? currentUser.user.data.id : null} />
        </SearchWrap>
    )
}

export default Search

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
}))

const AutoComplete = ({ user_id }) => {
    const [row, setRow] = useState(1)
    const searchBar = document.querySelector("#search-bar")
    const stateSearch = useSelector(selectorSearchHeader)

    if (searchBar)
        new ResizeObserver(() => {
            let widthSearch = document.querySelector("#search-bar").offsetWidth
            widthSearch < 500 ? setRow(1) : widthSearch < 850 ? setRow(2) : setRow(3)
        }).observe(searchBar)

    const Suggestion = styled(Box)(() => ({}))
    const Recent = styled(Box)(() => ({}))

    return (
        <Box
            id="auto-complete"
            tabIndex={-1}
            onFocus={() => (document.querySelector("#auto-complete").style.display = "block")}
            onBlur={() => (document.querySelector("#auto-complete").style.display = "none")}
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
            {stateSearch.suggest.isPending ? (
                <Loading />
            ) : stateSearch.suggest.result.length ? (
                <Suggestion className="suggestion">
                    <Box className="title">
                        <Typography>Gợi ý sản phẩm</Typography>
                    </Box>

                    <Box className="container-result">
                        {stateSearch.suggest.result.map((item, index) => {
                            const handleClick = () => {
                                /* Close auto complete */
                                document.querySelector("#auto-complete").style.display = "none"

                                /* Save result search */
                                requestSearchHeaderSaveRecent(item.id, user_id)
                            }

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
                                    <Link to={`${item.categoryLink}/${item.name}`} className="link">
                                        <Stack flexDirection="row" justifyContent="center" alignItems="center">
                                            <Stack justifyContent="center" alignItems="center" width={80}>
                                                <img src={JSON.parse(item.image)[0].base64} alt="" width="100%" />
                                            </Stack>

                                            <Stack justifyContent="center" alignItems="start" marginLeft={1}>
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
                            )
                        })}
                    </Box>
                </Suggestion>
            ) : (
                <Fragment />
            )}

            {stateSearch.recent.isPending ? (
                <Loading />
            ) : (
                <Recent className="suggestion">
                    <Box className="title">
                        <Typography>Tìm kiếm gần đây</Typography>
                    </Box>

                    <Box className="container-result">
                        {stateSearch.recent.result.map((item, index) => {
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
                                    <Link to={`${item.categoryLink}/${item.name}`} className="link">
                                        <Stack flexDirection="row" justifyContent="center" alignItems="center">
                                            <Stack justifyContent="center" alignItems="center" width={80}>
                                                <img src={JSON.parse(item.image)[0].base64} alt="" width="100%" />
                                            </Stack>

                                            <Stack justifyContent="center" alignItems="start" marginLeft={1}>
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
                            )
                        })}
                    </Box>
                </Recent>
            )}
        </Box>
    )
}

const Loading = () => (
    <Stack justifyContent="center" alignItems="center" width="100%" minHeight="80px">
        <CircularProgress />
    </Stack>
)
