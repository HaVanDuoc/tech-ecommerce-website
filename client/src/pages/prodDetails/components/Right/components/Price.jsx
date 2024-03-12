import { Stack, Typography } from "@mui/material"
import { Fragment } from "react"
import { useSelector } from "react-redux"
import { formatDiscount, formatPrice, formatVND } from "~/helper/format"
import { selectorProduct } from "~/redux/productSlice"

const Price = () => {
    const price = useSelector(selectorProduct)?.data?.price
    const discount = useSelector(selectorProduct)?.data?.discount

    return (
        price && (
            <Stack flexDirection="row" justifyContent="center" alignItems="center" sx={styles1}>
                {discount !== 0 ? <Typography sx={styles2}>{formatVND(price)}</Typography> : <Fragment />}

                <Typography sx={styles3}>{formatPrice(price, discount)}</Typography>

                {discount !== 0 ? <Typography sx={styles4}>{formatDiscount(discount)}</Typography> : <Fragment />}
            </Stack>
        )
    )
}

export default Price

const styles1 = {
    "& :nth-child(n)": {
        marginLeft: 1,
        marginRight: 1,
    },
}

const styles2 = {
    fontFamily: "'Antic Slab', serif",
    fontSize: 23,
    fontWeight: 400,
    color: "#000",
    textDecorationLine: "line-through",
    pointerEvents: "none",
}

const styles3 = {
    fontFamily: "'Antic Slab', serif",
    fontSize: 40,
    fontWeight: 500,
    color: "crimson",
    pointerEvents: "none",
}

const styles4 = {
    fontFamily: "'Antic Slab', serif",
    fontSize: 23,
    fontWeight: 500,
    color: "crimson",
    pointerEvents: "none",
}
