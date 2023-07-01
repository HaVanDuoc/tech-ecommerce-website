import { Box, Rating, Typography } from "@mui/material"

const RatingLine = () => {
    return (
        <Box sx={styles1}>
            <Typography sx={styles2}>4.0</Typography>
            <Rating name="read-only" value={4} readOnly sx={styles3} />
            <Typography sx={{ fontStyle: "italic" }}>{"(320 đánh giá)"}</Typography>
        </Box>
    )
}
export default RatingLine

const styles1 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    pointerEvents: "none",
}

const styles2 = {
    fontWeight: 500,
    textDecorationLine: "underline",
}

const styles3 = {
    marginLeft: 1,
    marginRight: 1,
}
