import { Box, Stack, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { requestGetCategories } from "~/api"
import { selectorCategories } from "~/redux/productSlice"

const SectionCategories = ({ category, setPage, setBrandParams }) => {
    const categories = useSelector(selectorCategories)
    const dispatch = useDispatch()

    useEffect(() => {
        if (categories.isFetch) return
        requestGetCategories(dispatch)
    }, [dispatch, categories])

    const handleClick = () => {
        setPage(1)
        setBrandParams(null)
    }

    return (
        <Box className="box categories">
            <Typography className="title">Danh mục</Typography>
            <Stack className="list">
                {categories?.categories?.map((item, index) => {
                    return (
                        <Link to={item.accessLink} key={index} onClick={handleClick}>
                            <Box className={`item ${category === item.categoryName && "selected"}`}>
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
