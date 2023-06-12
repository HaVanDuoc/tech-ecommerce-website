import { Box, Container, Grid, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { requestGetProducts } from "~/api"
import Card from "~/components/Card"
import SkeletonCard from "~/components/skeleton"
import { selectorLatestProducts } from "~/redux/productSlice"
import Title from "./Title"

const SuggestProduct = () => {
    const products = useSelector(selectorLatestProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (products.isFetch) return

        const config = {
            limit: 20,
        }

        requestGetProducts(dispatch, config)
    }, [dispatch, products])

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
                        {products.isFetch ? (
                            <Grid container spacing={2}>
                                {products?.products?.list?.map((item, index) => {
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
                            {products?.products?.counterProduct - products?.products?.list?.length > 0 ? (
                                <Box onClick={handleSeeMore} sx={styles2}>
                                    <Typography sx={styles3}>
                                        {`Xem thêm ${
                                            products?.products?.counterProduct - products?.products?.list?.length
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
