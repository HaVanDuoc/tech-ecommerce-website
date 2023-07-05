import "./style.css"
import { useParams } from "react-router-dom"
import ResponseRating from "./components/ResponseRating"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectorCurrentUser } from "~/redux/authSlice"
import { requestGetProduct } from "~/api"
import { selectorProduct } from "~/redux/productSlice"
import MainImage from "./components/MainImage"
import Right from "./components/Right"
import { Box, Grid, styled } from "@mui/material"

export default function ProductDetails() {
    const currentUser = useSelector(selectorCurrentUser)

    const dispatch = useDispatch()
    const product = useSelector(selectorProduct)
    const nameProduct = useParams().nameProduct

    useEffect(() => {
        window.scrollTo(0, 0) // Set position for scroll when access page
        requestGetProduct(dispatch, { nameProduct })
    }, [nameProduct, currentUser, dispatch, product.reFetch])

    return (
        <Section>
            <Grid container>
                <Grid item xs={6}>
                    <MainImage />
                </Grid>

                <Grid item xs={6}>
                    <Right />
                </Grid>
            </Grid>

            <ResponseRating />
        </Section>
    )
}

const Section = styled(Box)(() => ({
    backgroundColor: "#fff",
    paddingBottom: "50px",

    ".left": {
        width: "100%",
        height: "500px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
    },

    ".mainImage": {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },

    img: {
        maxWidth: "500px",
    },

    ".optionImage": {
        width: "100%",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& img": {
            height: "100%",
        },
    },
}))
