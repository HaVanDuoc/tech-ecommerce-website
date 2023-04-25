import { Pagination, Stack } from "@mui/material";
import React from "react";

const PaginationCustomize = ({ page, setPage, countProducts, limit }) => {
  const handleChangePagination = (event, value) => {
    setPage(value);

    const addOrUpdateURLParams = (key, value) => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, "", newRelativePathQuery);
    };

    addOrUpdateURLParams("page", value);
  };

  return (
    <Stack justifyContent="center" alignItems="center" marginTop={2}>
      <Pagination
        count={Number(Math.floor(countProducts / limit) + 1)}
        page={page}
        color="primary"
        size="large"
        onChange={handleChangePagination}
      />
    </Stack>
  );
};

export default PaginationCustomize;
