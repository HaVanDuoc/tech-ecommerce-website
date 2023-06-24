import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { requestSuggestToday } from "~/api"
import Card from "~/components/Card"
import SkeletonCard from "~/components/skeleton"
import Title from "./Title"
import { refetchSuggestToday, selectorSuggestToday } from "~/redux/pageHomeSlice"
import addOrUpdateURLParams from "~/utils/addURLParams"

const SuggestProduct = () => {
    const dispatch = useDispatch()
    const page = Number(new URLSearchParams(window.location.search).get("page") || 1)
    const limit = 20 * page

    const products = useSelector(selectorSuggestToday)
    const list = products?.payload?.list
    const currentPage = products?.payload?.currentPage
    const counterProduct = products?.payload?.counterProduct
    const limitOfPage = products?.payload?.limitOfPage
    const refetch = products?.refetch
    const isPending = products?.isPending

    useEffect(() => {
        requestSuggestToday(dispatch, { limit })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetch])

    const handleSeeMore = () => {
        addOrUpdateURLParams("page", Number(page) + Number(1))
        dispatch(refetchSuggestToday())
    }

    return (
        <Box sx={{ paddingBottom: 8 }}>
            <Container maxWidth="lg" disableGutters>
                <Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Title>Gợi ý cho hôm nay</Title>
                    </Box>

                    <Box>
                        {products && products.payload ? (
                            <Grid container spacing={2}>
                                {list &&
                                    list.map((item, index) => {
                                        return (
                                            <Grid item xs={2.4} key={index}>
                                                <Card product={item} />
                                            </Grid>
                                        )
                                    })}
                            </Grid>
                        ) : (
                            <Grid container spacing={2}>
                                {Array.apply(null, { length: 20 }).map(() => (
                                    <Grid item xs={2.4}>
                                        <SkeletonCard />
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        <Box sx={styles1}>
                            {list?.length !== counterProduct ? (
                                <Box onClick={handleSeeMore} sx={styles2}>
                                    {isPending ? (
                                        <CircularProgress size={25} />
                                    ) : (
                                        <Typography sx={styles3}>
                                            {`Xem thêm ${counterProduct - currentPage * limitOfPage} sản phẩm`}
                                        </Typography>
                                    )}
                                </Box>
                            ) : (
                                <Typography fontSize="13px" fontStyle="italic">
                                    (Đã đến cuối)
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default SuggestProduct

const styles1 = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "32px",
}

const styles2 = {
    width: "350px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #aaa",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#fff",
    boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",
    transition: "all .3s ease",

    ":hover": {
        borderColor: "var(--color-main)",
        boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",

        "& p": {
            color: "var(--color-main)",
        },
    },
}

const styles3 = {
    color: "var(--color-text)",
    textTransform: "capitalize",
    fontWeight: 500,
}
