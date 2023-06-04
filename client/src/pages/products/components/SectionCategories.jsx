import { Box, Stack, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { requestGetCategories } from "~/api"
import { reFetchProductPage, selectorCategories } from "~/redux/productSlice"
import addOrUpdateURLParams from "~/utils/addURLParams"

const SectionCategories = () => {
    const categories = useSelector(selectorCategories)
    const dispatch = useDispatch()
    const currentCategory = `/${useParams().category}`

    useEffect(() => {
        if (categories.isFetch) return
        requestGetCategories(dispatch)
    }, [dispatch, categories])

    const handleClick = () => {
        addOrUpdateURLParams()
        dispatch(reFetchProductPage())
    }

    return (
        <Box className="box categories">
            <Typography className="title">Danh mục</Typography>
            <Stack className="list">
                {categories?.categories?.map((item, index) => {
                    return (
                        <Link to={item.accessLink} key={index} onClick={handleClick}>
                            <Box className={`item ${currentCategory === item.accessLink && "selected"}`}>
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
