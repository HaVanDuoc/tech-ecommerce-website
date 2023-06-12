import { Box, Rating, Stack, Typography } from "@mui/material"
import React, { Fragment } from "react"
import { formatCost, formatDiscount, formatPrice } from "~/helper/format"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import { useNavigate } from "react-router-dom"
import { requestUpdateViewProduct } from "~/api"

const Card = ({ product }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        requestUpdateViewProduct(product.product_id)
        navigate(`${product?.category_link}/${product?.product_name}`)
    }

    return (
        <Box className="card" sx={styles1} onClick={handleClick}>
            <Stack flexDirection="column">
                <Box sx={styles2}>
                    <img
                        src={product?.product_image ? product?.product_image[0].path : ""}
                        alt=""
                        width="100%"
                        className="image"
                    />
                </Box>

                <Stack flexDirection="column" sx={{ height: 180, zIndex: 2 }}>
                    <Typography sx={styles3}>{product?.product_category ? product?.product_category : ""}</Typography>

                    <Typography className="name-product" sx={styles4}>
                        {product?.product_name ? product?.product_name : ""}
                    </Typography>

                    <Stack flexDirection="row" alignItems="center" paddingBottom={1} height={35}>
                        <Rating value={4} readOnly size="small" />
                        <Typography fontSize={13} sx={styles5}>
                            (32)
                        </Typography>
                    </Stack>

                    <Stack flexDirection="row" alignItems="center">
                        {product?.product_price ? (
                            <Typography sx={styles6}>
                                {formatPrice(product.product_price, product.product_discount)}
                            </Typography>
                        ) : (
                            <Fragment />
                        )}

                        {product?.discount && (
                            <Typography sx={styles7}>{formatCost(product?.product_price)}</Typography>
                        )}
                    </Stack>
                </Stack>
            </Stack>

            <Box className="select" sx={styles8}>
                <Stack flexDirection="column" spacing={1}>
                    <Box className="item">
                        <FavoriteBorderOutlinedIcon />
                    </Box>
                    <Box className="item">
                        <RemoveRedEyeOutlinedIcon />
                    </Box>
                    <Box className="item">
                        <LocalMallOutlinedIcon />
                    </Box>
                </Stack>
            </Box>

            {product?.product_discount && (
                <Box sx={styles9}>
                    <Typography fontSize={12} fontWeight={600}>
                        {formatDiscount(product?.product_discount)}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default Card

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
