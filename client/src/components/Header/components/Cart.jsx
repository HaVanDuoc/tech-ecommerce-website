import { Badge, Button, Stack, styled } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { Link } from "react-router-dom"
import { selectorCartProducts, setCounterCartProduct } from "~/redux/productSlice"
import axiosInstance from "~/api"

const Cart = () => {
    const cart = useSelector(selectorCartProducts)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetch = async () => {
            const response = await axiosInstance("get", "/cart/counter")

            dispatch(setCounterCartProduct(response.data.data))
        }

        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart.refetchCounter])

    return (
        <Stack justifyContent="center" alignItems="center">
            <Link to="/cart">
                <Button sx={{ color: "var(--color-main)" }}>
                    <StyledBadge badgeContent={cart.counter ? cart.counter : 0} color="error">
                        <ShoppingCartOutlinedIcon sx={{ color: "#666" }} />
                    </StyledBadge>
                </Button>
            </Link>
        </Stack>
    )
}

export default Cart

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}))
