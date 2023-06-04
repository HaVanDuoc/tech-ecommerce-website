import { Box, Container, Grid, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { requestGetProducts } from "~/api"
import Card from "~/components/card"
import SkeletonCard from "~/components/skeleton"
import { selectorLatestProducts } from "~/redux/productSlice"

const SuggestProduct = ({ Title }) => {
    const suggestProduct = useSelector(selectorLatestProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (suggestProduct.isFetch) return

        const config = {
            limit: 20,
        }

        requestGetProducts(dispatch, config)
    }, [dispatch, suggestProduct])

    const handleSeeMore = () => {
        // if (offset === 0) {
        //   setOffset(limit);
        //   setLimit(10);
        //   return;
        // }
        // setOffset(offset + 10);
        // setLimit(10);
    }

    return (
        <Box sx={{ paddingBottom: 8 }}>
            <Container maxWidth="lg" disableGutters>
                <Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Title>Gợi ý cho hôm nay</Title>
                    </Box>

                    <Box>
                        {suggestProduct.isFetch ? (
                            <Grid container spacing={2}>
                                {suggestProduct?.products?.list?.map((item, index) => {
                                    return (
                                        <Grid item xs={2.4} key={index}>
                                            <Card product={item} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        ) : (
                            <Grid container spacing={2}>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SkeletonCard />
                                </Grid>
                            </Grid>
                        )}

                        {/* Button Xem thêm */}
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "32px",
                            }}
                        >
                            {suggestProduct?.products?.counter_products - suggestProduct?.products?.list?.length > 0 ? (
                                <Box
                                    onClick={handleSeeMore}
                                    sx={{
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
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "var(--color-text)",
                                            textTransform: "capitalize",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {`Xem thêm ${
                                            suggestProduct?.products?.counter_products -
                                            suggestProduct?.products?.list?.length
                                        } sản phẩm`}
                                    </Typography>
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
