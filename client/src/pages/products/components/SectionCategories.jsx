import { Box, Stack, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { requestCategories } from "~/api"
import { reFetchProductPage, selectorProducts } from "~/redux/productSlice"
import addOrUpdateURLParams from "~/utils/addURLParams"

const SectionCategories = () => {
    const categories = useSelector(selectorProducts)?.categories
    const currentCategory = useParams().category
    const dispatch = useDispatch()

    useEffect(() => {
        if (!categories.length) requestCategories(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {
        addOrUpdateURLParams()
        dispatch(reFetchProductPage())
    }

    return (
        <Box className="box categories">
            <Typography className="title">Danh mục</Typography>
            <Stack className="list">
                {categories.length &&
                    categories.map((item, index) => {
                        return (
                            <Link to={`/${item.alias}`} key={index} onClick={handleClick}>
                                <Box className={`item ${currentCategory === item.alias && "selected"}`}>
                                    {item.categoryName}
                                </Box>
                            </Link>
                        )
                    })}
            </Stack>
        </Box>
    )
}

export default SectionCategories
