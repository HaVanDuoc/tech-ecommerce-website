import styled from "@emotion/styled"
import SearchIcon from "@mui/icons-material/Search"
import { useDispatch, useSelector } from "react-redux"
import { selectorCurrentUser } from "~/redux/authSlice"
import { requestSearchHeaderRecent, requestSearchHeaderSuggest } from "~/api"
import { selectorSearchHeader } from "~/redux/searchSlice"
import AutoComplete from "./components/AutoComplete"
import { useEffect } from "react"
import { Box, Button, InputBase } from "@mui/material"

const Search = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectorCurrentUser)
    const stateSearch = useSelector(selectorSearchHeader)

    useEffect(() => {
        if (stateSearch.recent.isFetch) return
        requestSearchHeaderRecent(dispatch, currentUser.isLogged ? currentUser?.user?.id : null)
    }, [dispatch, currentUser, stateSearch])

    return (
        <SearchWrap id="search-bar">
            <IconSearch />

            <InputSearch />

            <Button sx={{ textTransform: "none" }} className="btn-search">
                Tìm kiếm
            </Button>

            <AutoComplete user_id={currentUser.isLogged ? currentUser?.user?.id : null} />
        </SearchWrap>
    )
}

export default Search

const InputSearch = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => requestSearchHeaderSuggest(dispatch, e)

    const handleClick = () => {
        document.querySelector("#auto-complete").style.display = "block"
    }

    return (
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
    )
}

const IconSearch = () => {
    const style1 = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",
        height: "40px",
        color: "var(--color-secondary)",
    }

    return (
        <Box sx={style1}>
            <SearchIcon className="icon-search" />
        </Box>
    )
}

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
