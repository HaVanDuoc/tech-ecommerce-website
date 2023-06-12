import React, { Fragment } from "react"
import { Pagination, Stack } from "@mui/material"
import addOrUpdateURLParams from "~/utils/addURLParams"
import { useDispatch } from "react-redux"

const PaginationCustomize = ({ counterPage, refetch }) => {
    const page = Number(new URLSearchParams(window.location.search).get("page")) || 1
    const dispatch = useDispatch()

    const handleChangePagination = (event, value) => {
        addOrUpdateURLParams("page", value)
        dispatch(refetch)
    }

    return (
        <Fragment>
            {counterPage > 1 && (
                <Stack justifyContent="center" alignItems="center" marginTop={2}>
                    <Pagination
                        count={counterPage}
                        page={page}
                        color="primary"
                        size="large"
                        onChange={handleChangePagination}
                    />
                </Stack>
            )}
        </Fragment>
    )
}

export default PaginationCustomize
