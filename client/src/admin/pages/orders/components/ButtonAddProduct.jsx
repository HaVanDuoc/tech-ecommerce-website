import { Box, IconButton, Modal, Stack, Tooltip, Typography, styled } from "@mui/material"
import { PF } from "~/utils/__variables"
import { useSnackbar } from "notistack"
import React, { Fragment } from "react"
import SearchIcon from "@mui/icons-material/Search"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined"
import { formatCost, formatDiscount, formatPrice } from "~/helper/format"
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined"
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined"
import axiosInstance, { requestSearchProduct } from "~/api"
import { useDispatch, useSelector } from "react-redux"
import { resetSearch, selectorSearch } from "~/redux/productSlice"
import { refetchOrder } from "~/redux/orderSlice"

const ButtonAddProduct = ({ order_detail_id, reset, setReset }) => {
    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch()
    const result = useSelector(selectorSearch)?.payload

    const handleOpen = () => setOpen(true)

    const handleClose = () => {
        dispatch(resetSearch())
        setOpen(false)
    }

    const onChange = (e) => {
        requestSearchProduct(dispatch, e.target.value, 6)
    }

    return (
        <Fragment>
            <Stack
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                sx={{ cursor: "pointer" }}
                onClick={handleOpen}
            >
                <ControlPointDuplicateOutlinedIcon sx={style1} />
                <Stack position="relative" left={-10} border="2px solid #44b700" borderRadius={15} padding="1px 15px">
                    <Typography fontSize={13} fontWeight={500}>
                        Thêm sản phẩm
                    </Typography>
                </Stack>
            </Stack>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Input>
                        <SearchIcon />
                        <input id="input-search" placeholder="Tìm kiếm..." autoFocus onChange={onChange} />
                    </Input>
                    <AutoComplete>
                        {Array.isArray(result) ? (
                            result.length ? (
                                result.slice(0, 3).map((item, index) => {
                                    return (
                                        <Item
                                            index={index}
                                            id={item.id}
                                            image={item?.files && item?.files[0].path}
                                            category={item.category}
                                            name={item.name}
                                            price={item.price}
                                            discount={item.discount}
                                            order_detail_id={order_detail_id}
                                            handleCloseSearch={handleClose}
                                            reset={reset}
                                            setReset={setReset}
                                        />
                                    )
                                })
                            ) : (
                                <NoResult value={document.querySelector("#input-search").value} />
                            )
                        ) : (
                            <StartSearch />
                        )}
                    </AutoComplete>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default ButtonAddProduct

const Item = ({
    index,
    id,
    image,
    category,
    name,
    price,
    discount,
    order_detail_id,
    handleCloseSearch,
    reset,
    setReset,
}) => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()

    const handleSnackBar = (res) => {
        if (res.data.err === 0) {
            enqueueSnackbar(res.data.msg, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 4000,
            })
        } else {
            enqueueSnackbar(res.data.msg, {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 4000,
            })
        }
    }

    const handleDecrease = () => {
        const quantity = document.querySelector(`#quantity-${index}`).innerHTML

        if (Number(quantity) === 1) return

        document.querySelector(`#quantity-${index}`).innerHTML = Number(quantity) - 1
    }

    const handleIncrease = () => {
        const quantity = document.querySelector(`#quantity-${index}`).innerHTML

        document.querySelector(`#quantity-${index}`).innerHTML = Number(quantity) + 1
    }

    const handleAddProduct = () => {
        const quantity = document.querySelector(`#quantity-${index}`).innerHTML

        const addProduct = async () => {
            const response = await axiosInstance("post", "/order/orderDetails/addProduct", {
                order_detail_id,
                product_id: id,
                quantity,
            })

            handleSnackBar(response)

            handleCloseSearch()

            dispatch(refetchOrder())
        }

        addProduct()
    }

    return (
        <Stack
            key={index}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            height={150}
            padding="12px 54px"
            width="100%"
            sx={{
                ":hover": {
                    backgroundColor: "#1e90ff12",
                },
            }}
        >
            <Stack flexDirection="row" height="100%" width="70%" alignItems="center" justifyContent="start">
                <Stack width="30%" height="80%" justifyContent="center" alignItems="center">
                    <img src={image} alt="" height="100%" width="auto" />
                </Stack>

                <Stack ml={2}>
                    <Typography
                        sx={{
                            color: "#d51919",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            fontFamily: "'Chakra Petch', sans-serif",
                        }}
                    >
                        {category}
                    </Typography>

                    <Typography
                        className="name-product"
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            paddingBottom: 1,
                            fontSize: "17px",
                            color: "var(--color-text)",
                            overflowWrap: "break-word",
                        }}
                    >
                        {name}
                    </Typography>

                    <Stack flexDirection="row" alignItems="center" sx={{ "& p": { mr: "5px" } }}>
                        <Typography color="crimson" fontWeight={500}>
                            {formatPrice(price, discount)}
                        </Typography>

                        {discount && (
                            <Fragment>
                                <Typography>{formatCost(price)}</Typography>
                                <Typography fontSize={13} color="crimson">
                                    {formatDiscount(discount)}
                                </Typography>
                            </Fragment>
                        )}
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                flexDirection="row"
                alignItems="center"
                sx={{
                    "& svg": {
                        ":hover": {
                            cursor: "pointer",
                        },
                    },
                }}
            >
                <IconButton id={`button-decrease-${index}`} onClick={handleDecrease}>
                    <RemoveOutlinedIcon fontSize="small" />
                </IconButton>
                <Typography id={`quantity-${index}`} fontSize={18} fontWeight={500} mx={2}>
                    1
                </Typography>
                <IconButton id={`button-increase-${index}`} onClick={handleIncrease}>
                    <AddOutlinedIcon fontSize="small" />
                </IconButton>
            </Stack>

            <Stack
                sx={{
                    "& svg": {
                        ":hover": {
                            cursor: "pointer",
                        },
                    },
                }}
            >
                <Tooltip title="Thêm vào">
                    <IconButton onClick={handleAddProduct}>
                        <LibraryAddOutlinedIcon
                            sx={{
                                ":hover": {
                                    color: "dodgerblue",
                                },
                            }}
                        />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    )
}

const StartSearch = () => {
    return (
        <Stack justifyContent="center" alignItems="center" minHeight={400}>
            <img src={PF + "/assets/admin-order-detail/hoyo.gif"} alt="" width={120} />
            <Typography color="666" fontSize={18}>
                Bạn đang tìm gì..?
            </Typography>
        </Stack>
    )
}

const NoResult = ({ value }) => {
    return (
        <Stack justifyContent="center" alignItems="center" minHeight={400}>
            <img
                src={PF + "/assets/admin-order-detail/5436450020c1e39a6d6626c8c2349dfb_8449394452872526297.gif"}
                alt=""
            />
            <Typography color="666" fontSize={18}>
                {`Không tìm thấy sản phẩm phù hợp với "${value}"`}
            </Typography>
        </Stack>
    )
}

const AutoComplete = styled(Stack)(() => ({
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
}))

const Input = styled(Stack)(() => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    padding: 10,
    overflow: "hidden",
    borderBottom: "1px solid #ccc",

    "& svg, input": {
        height: 50,
    },

    "& svg": {
        fontSize: "30px",
        color: "dodgerblue",
        marginRight: 10,
        marginLeft: 10,
    },

    "& input": {
        flex: 1,
        border: "none",
        fontSize: 18,
        lineHeight: 5,
    },
}))

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    backgroundColor: "#fff",
    boxShadow: 24,
    borderRadius: 5,
}

const style1 = {
    width: 50,
    height: 50,
    color: "#44b700",
    zIndex: 2,
    backgroundColor: "#fff",
}
