import { Avatar, Box, Container, Grid, Rating, styled, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import FormRating from "./components/FormRating"
// import Statistic from "./components/Statistic"
import Like from "./components/Like"
import RatingHeader from "./components/RatingHeader"

const ResponseRating = () => {
    const [ratings, setRatings] = useState(null)
    const [numberOfRating, setNumberOfRating] = useState(5) // default show 5 ratings

    useEffect(() => {
        setRatings(dummyRating)
    }, [])

    // Section rating
    // every time click show more 5 ratings
    const handleClickShowMore = () => {
        if (numberOfRating < ratings.length) {
            setNumberOfRating(numberOfRating + 5)
        }
    }

    return (
        <SectionRating>
            <Container maxWidth="lg" disableGutters>
                <WrapRating>
                    <RatingHeader />

                    <FormRating />

                    <RatingContent>
                        {/* <Statistic /> */}

                        <ListRating>
                            {dummyRating.slice(0, numberOfRating).map((rating, index) => {
                                return (
                                    <Box className="item" key={index}>
                                        <Grid item marginRight={2} display="flex" alignItems="center">
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </Grid>
                                        <Grid item xs={12} sm container direction="column">
                                            <Grid item xs>
                                                <Typography fontWeight={500}>Hà Văn Được</Typography>
                                            </Grid>
                                            <Grid item xs>
                                                <Rating value={4} readOnly size="small" />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography
                                                    sx={{
                                                        fontSize: ".8rem",
                                                    }}
                                                >
                                                    2023-01-29 15:15
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Box className="reviews">
                                                    <Box>
                                                        <Typography variant="span" className="title">
                                                            Chất lượng sản phẩm:
                                                        </Typography>
                                                        <Typography variant="span" className="result">
                                                            Tốt
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="span" className="title">
                                                            Tính năng nổi bậc:
                                                        </Typography>
                                                        <Typography variant="span" className="result">
                                                            Tốt
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="span" className="title">
                                                            Đánh giá:
                                                        </Typography>
                                                        <Typography variant="span" className="result">
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                            Nemo eum unde at suscipit cupiditate? Consectetur at quis
                                                            est repudiandae, beatae quo dicta facilis commodi expedita
                                                            eius, libero eveniet nobis ipsum.
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Like />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )
                            })}
                        </ListRating>

                        <ShowMore>
                            {numberOfRating < ratings?.length ? (
                                <Typography className="buttonShowMore" onClick={handleClickShowMore}>
                                    Xem thêm đánh giá
                                </Typography>
                            ) : (
                                <Typography className="final">(Đã đến cuối)</Typography>
                            )}
                        </ShowMore>
                    </RatingContent>
                </WrapRating>
            </Container>
        </SectionRating>
    )
}

export default ResponseRating

const ShowMore = styled(Box)(() => ({
    textAlign: "center",

    ".buttonShowMore": {
        fontStyle: "italic",
        fontSize: "16px",
        cursor: "pointer",
        transition: "all .3s ease-in-out",

        "&:hover": {
            color: "dodgerblue",
            textDecoration: "underline",
        },
    },

    ".final": {
        fontStyle: "italic",
        fontSize: "14px",
    },
}))

const dummyRating = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

const RatingContent = styled(Box)(() => ({}))

const WrapRating = styled(Box)(() => ({
    width: "100%",
    border: "1px solid #c1c1c1",
    margin: "50px 0",
    padding: "20px",
    borderRadius: "15px",
    color: "#1a2027",
}))

const SectionRating = styled(Box)(() => ({
    backgroundColor: "#fff",

    ".reviews": {
        padding: "10px 0",
        fontSize: "1rem",

        ".title": {
            color: "#555",
            marginRight: "7px",
        },

        ".result": {},
    },
}))

const ListRating = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    ".item": {
        width: "100%",
        padding: "20px 0",
        display: "flex",
        borderTop: "0.5px solid lightgrey",
    },

    ".likeRating": {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
        fontSize: "14px",
        color: "var(--color-text)",

        ".icon": {
            fontSize: "18px",
            marginRight: "5px",
        },

        ".timesLike": {
            fontSize: "14px",
        },

        "&:hover": {
            ".icon, .timesLike": {
                transition: "all .4s ease-in-out",
                cursor: "pointer",
                color: "dodgerblue",
            },
        },
    },
}))
