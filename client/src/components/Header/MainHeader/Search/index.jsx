import { Box, Button, Divider, InputBase, styled } from "@mui/material";
import React from "react";

import SearchIcon from "@mui/icons-material/Search";

const SearchRoot = styled(Box)(({ theme }) => ({
  position: "relative",
  border: "1px solid var(--background-color-hover)",
  borderRadius: "var(--border-radius)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  margin: "0 20px",

  "& hr": {
    marginRight: "0 !important",
    color: "var(--background-color-hover)",
  },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  color: "var(--color-secondary)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flexGrow: 1,
}));

const StyledButtonSearch = styled(Button)(({ theme }) => ({
  textTransform: "none",
}));

const Search = () => {
  return (
    <SearchRoot>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase placeholder="Bạn đang tìm gì?" />

      <Divider orientation="vertical" variant="middle" flexItem />

      <StyledButtonSearch>Tìm kiếm</StyledButtonSearch>
    </SearchRoot>
  );
};

export default Search;
