import { Box, Stack, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { requestCategories } from "~/api"
import { selectorCategories } from "~/redux/categorySlice"
import { reFetchProductPage } from "~/redux/productSlice"
import addOrUpdateURLParams from "~/utils/addURLParams"

const SectionCategories = () => {
    const categories = useSelector(selectorCategories)?.payload
    const currentCategory = useParams().category
    const dispatch = useDispatch()

    useEffect(() => {
        if (!categories) requestCategories(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {
        window.scrollTo(0, 357)
        addOrUpdateURLParams()
        dispatch(reFetchProductPage())
    }

    return (
        <Box className="box categories">
            <Typography className="title">Danh mục</Typography>
            <Stack className="list">
                {categories &&
                    categories.map((item, index) => {
                        const alias = item.alias
                        const name = item.name

                        return (
                            <Link to={`/${alias}`} key={index} onClick={handleClick}>
                                <Box className={`item ${currentCategory === alias && "selected"}`}>{name}</Box>
                            </Link>
                        )
                    })}
            </Stack>
        </Box>
    )
}

export default SectionCategories
