import { Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { selectorProduct } from "~/redux/productSlice"

const Category = () => {
    const category = useSelector(selectorProduct)?.data?.category

    return (
        category && (
            <Typography
                sx={{
                    fontFamily: "'Saira Condensed', sans-serif",
                    textTransform: "uppercase",
                    fontSize: 25,
                    pointerEvents: "none",
                }}
            >
                {category}
            </Typography>
        )
    )
}

export default Category
