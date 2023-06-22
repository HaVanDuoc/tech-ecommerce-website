import { Box, CircularProgress, Stack, Typography, styled } from "@mui/material"
import { Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { requestSearchHeaderSaveRecent, requestUpdateViewProduct } from "~/api"
import { formatCost, formatDiscount, formatPrice } from "~/helper/format"
import { selectorSearchHeader } from "~/redux/searchSlice"

const AutoComplete = ({ user_id }) => {
    const [row, setRow] = useState(1)
    const searchBar = document.querySelector("#search-bar")
    const stateSearch = useSelector(selectorSearchHeader)

    const recent = stateSearch?.recent
    const suggest = stateSearch?.suggest

    if (searchBar)
        new ResizeObserver(() => {
            let widthSearch = document.querySelector("#search-bar").offsetWidth
            widthSearch < 500 ? setRow(1) : widthSearch < 850 ? setRow(2) : setRow(3)
        }).observe(searchBar)

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
            {suggest?.isPending ? (
                <Loading />
            ) : suggest?.result?.length ? (
                <Suggestion className="suggestion">
                    <Box className="title">
                        <Typography>Gợi ý sản phẩm</Typography>
                    </Box>

                    <Box className="container-result">
                        {suggest?.result.map((item, index) => {
                            const handleClick = () => {
                                /* Close auto complete */
                                document.querySelector("#auto-complete").style.display = "none"

                                /* Save result search */
                                requestSearchHeaderSaveRecent(item.id, user_id)

                                requestUpdateViewProduct(item.id)
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
                                    <Link to={`${item.alias}/${item.name}`} className="link">
                                        <Stack flexDirection="row" justifyContent="center" alignItems="center">
                                            <Stack justifyContent="center" alignItems="center" width={80}>
                                                <img
                                                    src={item.files[0].path}
                                                    alt={item.files[0].originalName}
                                                    width="100%"
                                                />
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

            {recent?.isPending ? (
                <Loading />
            ) : (
                <Recent className="suggestion">
                    <Box className="title">
                        <Typography>Tìm kiếm gần đây</Typography>
                    </Box>

                    <Box className="container-result">
                        {recent?.result?.map((item, index) => {
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
                                    <Link to={`${item.alias}/${item.name}`} className="link">
                                        <Stack flexDirection="row" justifyContent="center" alignItems="center">
                                            <Stack justifyContent="center" alignItems="center" width={80}>
                                                <img
                                                    src={item.files[0].path}
                                                    alt={item.files[0].originalName}
                                                    width="100%"
                                                />
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

export default AutoComplete

const Loading = () => (
    <Stack justifyContent="center" alignItems="center" width="100%" minHeight="80px">
        <CircularProgress />
    </Stack>
)

const Suggestion = styled(Box)(() => ({}))

const Recent = styled(Box)(() => ({}))
