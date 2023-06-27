import { Box, Rating, Stack, Typography } from "@mui/material"
import React, { Fragment, useState } from "react"
import { formatCost, formatDiscount, formatPrice } from "~/helper/format"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import { useNavigate } from "react-router-dom"
import { requestAddCart, requestUpdateViewProduct } from "~/api"
import LocalMallIcon from "@mui/icons-material/LocalMall"
import { useDispatch } from "react-redux"
import { exportResponse, setResponse } from "~/redux/alertSlice"

const Card = ({ product }) => {
    const navigate = useNavigate()

    const product_id = product?.product_id
    const product_name = product?.product_name ? product?.product_name : ""
    const category_alias = product.category_alias
    const product_image = product?.product_image ? product?.product_image[0].path : ""
    const product_category = product?.product_category ? product?.product_category : ""
    const product_price = product?.product_price
    const product_discount = product?.product_discount
    const inCart = product?.inCart || false

    const handleClick = () => {
        requestUpdateViewProduct(product_id)
        navigate(`/${category_alias}/${product_name}`)
    }

    return (
        <Stack sx={style10}>
            <Box className="card" sx={styles1} onClick={handleClick}>
                <Stack flexDirection="column">
                    <Box sx={styles2}>
                        <img src={product_image} alt="" width="100%" className="image" />
                    </Box>

                    <Stack flexDirection="column" sx={{ height: 180, zIndex: 2 }}>
                        <Typography sx={styles3}>{product_category}</Typography>

                        <Typography className="name-product" sx={styles4}>
                            {product_name}
                        </Typography>

                        <Stack flexDirection="row" alignItems="center" paddingBottom={1} height={35}>
                            <Rating value={4} readOnly size="small" />
                            <Typography fontSize={13} sx={styles5}>
                                (32)
                            </Typography>
                        </Stack>

                        <Stack flexDirection="row" alignItems="center">
                            {product_price ? (
                                <Typography sx={styles6}>{formatPrice(product_price, product_discount)}</Typography>
                            ) : (
                                <Fragment />
                            )}

                            {product_discount && <Typography sx={styles7}>{formatCost(product_price)}</Typography>}
                        </Stack>
                    </Stack>
                </Stack>

                {product_discount !== 0 && (
                    <Box sx={styles9}>
                        <Typography fontSize={12} fontWeight={600}>
                            {formatDiscount(product_discount)}
                        </Typography>
                    </Box>
                )}
            </Box>

            <OptionSelect
                name={product_name}
                category={product_category}
                product_id={product_id}
                inCart={inCart}
                handleClickView={handleClick}
            />
        </Stack>
    )
}

export default Card

const OptionSelect = ({ name, category, product_id, inCart, handleClickView }) => {
    const [cart, setCart] = useState(inCart)
    const [favorite, setFavorite] = useState(false)
    const dispatch = useDispatch()

    const handleClickCart = () => {
        setCart(!cart)
        requestAddCart(dispatch, { product_id })
    }

    const handleClickFavorite = () => {
        setFavorite(!favorite)
        if (!favorite) {
            dispatch(setResponse({ data: { err: 0, msg: `${category} ${name} đã được lưu vào mục yêu thích!` } }))
            dispatch(exportResponse())
        }
    }

    return (
        <Box className="select" sx={styles8}>
            <Stack flexDirection="column" spacing={1}>
                <Box className="item" onClick={handleClickFavorite}>
                    {favorite ? (
                        <FavoriteBorderOutlinedIcon sx={{ color: "dodgerblue !important" }} />
                    ) : (
                        <FavoriteBorderOutlinedIcon />
                    )}
                </Box>
                <Box className="item" onClick={handleClickView}>
                    <RemoveRedEyeOutlinedIcon />
                </Box>
                <Box className="item" onClick={handleClickCart}>
                    {cart ? <LocalMallIcon sx={{ color: "dodgerblue !important" }} /> : <LocalMallOutlinedIcon />}
                </Box>
            </Stack>
        </Box>
    )
}

const styles1 = {
    width: "100%",
    height: "100%",
    maxWidth: "350px",
    borderRadius: "5px",
    boxShadow: "0 0 3px 1px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    padding: 3,
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "all .4s ease-in-out",
    position: "relative",
    zIndex: 1,

    ":hover": {
        boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.2)",

        ".select": {
            transform: "none",
        },

        ".image": {
            transform: "scale(1.1)",
        },

        ".name-product": {
            color: "dodgerblue",
        },
    },

    ".image": {
        maxHeight: 200,
        transform: "none",
        transition: "transform .4s ease-in-out",
    },
}

const styles2 = {
    minHeight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const styles3 = {
    color: "#d51919",
    fontWeight: 500,
    textTransform: "uppercase",
    fontFamily: "'Chakra Petch', sans-serif",
    paddingBottom: 1,
}

const styles4 = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
    paddingBottom: 1,
    fontSize: "17px",
    color: "var(--color-text)",
}

const styles5 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 1,
    color: "#666",
}

const styles6 = {
    fontWeight: 500,
    fontSize: "17px",
    marginRight: 1,
    color: "crimson",
}

const styles7 = {
    fontWeight: 500,
    fontSize: "15px",
    color: "#666",
}

const styles8 = {
    position: "absolute",
    top: "30px",
    right: 0,
    transform: "translateX(100%)",
    transition: "all .4s ease-in-out",
    opacity: 0,
    zIndex: 99,

    ".item": {
        borderRadius: "5px 0 0 5px",
        borderTop: "1px solid #ddd",
        borderLeft: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
        padding: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0,1)",
        cursor: "pointer",

        svg: {
            color: "#555",
        },

        ":hover": {
            svg: {
                color: "dodgerblue",
            },
        },
    },
}

const styles9 = {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "#ffc300",
    color: "#000",
    padding: "3px 10px",
    borderRadius: "15px",
}

const style10 = {
    position: "relative",

    ":hover": {
        ".select": {
            opacity: 1,
            transform: "none",
        },
    },
}
