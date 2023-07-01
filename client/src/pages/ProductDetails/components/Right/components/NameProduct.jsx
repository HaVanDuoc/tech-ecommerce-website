import { useSelector } from "react-redux"
import { selectorProduct } from "~/redux/productSlice"

const { Typography } = require("@mui/material")

const NameProduct = () => {
    const name = useSelector(selectorProduct)?.data?.name

    return (
        name && (
            <Typography
                sx={{
                    fontFamily: "'Michroma', sans-serif",
                    textAlign: "center",
                    fontSize: 40,
                    marginBottom: 3,
                    pointerEvents: "none",
                }}
            >
                {name}
            </Typography>
        )
    )
}

export default NameProduct
