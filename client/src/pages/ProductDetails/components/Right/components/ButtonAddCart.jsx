import { Button, Typography } from "@mui/material"
import { Fragment } from "react"
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined"
import ModalContainer from "~/containers/ModalLogin"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { useDispatch, useSelector } from "react-redux"
import { reFetchProduct, selectorProduct } from "~/redux/productSlice"
import { modalLoginForm, selectorCurrentUser } from "~/redux/authSlice"
import axiosInstance from "~/api"

const ButtonAddCart = () => {
    const inCart = useSelector(selectorProduct)?.data?.inCart
    const product_id = useSelector(selectorProduct)?.data?.id
    const currentUser = useSelector(selectorCurrentUser)
    const dispatch = useDispatch()

    const handleAddCart = async () => {
        if (currentUser.isLogged === false) return dispatch(modalLoginForm())

        await axiosInstance("post", "/product/addCart", { product_id })

        dispatch(reFetchProduct())
    }

    return (
        <Fragment>
            {inCart ? (
                <Button sx={styles1} onClick={() => handleAddCart()}>
                    <AddShoppingCartOutlinedIcon />
                    <Typography>Đã có trong giỏ hàng</Typography>
                </Button>
            ) : (
                <ModalContainer>
                    <Button sx={styles2} onClick={() => handleAddCart()}>
                        <ShoppingCartOutlinedIcon />
                        <Typography>Thêm vào giỏ hàng</Typography>
                    </Button>
                </ModalContainer>
            )}
        </Fragment>
    )
}
export default ButtonAddCart

const styles1 = {
    padding: "15px 20px",
    backgroundColor: "#4dd024",
    color: "#fff",
    border: "2px solid transparent",

    "&:hover": {
        color: "#4dd024 !important",
        borderColor: "#4dd024 !important",
        backgroundColor: "#fff !important",
    },
}

const styles2 = {
    padding: "15px 20px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "2px solid transparent",

    "&:hover": {
        color: "#1976d2 !important",
        borderColor: "#1976d2 !important",
        backgroundColor: "#fff !important",
    },
}
