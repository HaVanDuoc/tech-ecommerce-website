import { Box, Button, IconButton } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { formatVND } from "~/helper/format"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import PaginationCustomize from "~/components/Pagination"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"
import { actionConfirm, handleButtonConfirm } from "./components/handleConfirm"
import ButtonCreateOrder from "./components/ButtonCreateOrder"
import axiosInstance from "~/utils/axiosInstance"
import { refetch, selectorOrders } from "~/redux/orderSlice"
import { requestOrders } from "~/api"
import { AdminTitle } from "~/admin/Styled"

export default function Orders() {
    const { enqueueSnackbar } = useSnackbar()
    const orders = useSelector(selectorOrders)

    const type = new URLSearchParams(window.location.search).get("type")
    const page = Number(new URLSearchParams(window.location.search).get("page")) || 1
    const products = orders?.payload && orders.payload[`${type}`] && orders.payload[`${type}`][`page-${page}`]
    const sumPages = orders?.payload && orders.payload[`${type}`] && orders.payload[`${type}`]?.sumPages
    const isPending = orders?.isPending
    const dispatch = useDispatch()

    useEffect(() => {
        requestOrders(dispatch, type, page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders.refetch])

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

    const handleClick = (actionConfirm, actionConfirmed, codeOrder) => {
        const request = async () => {
            const response = await axiosInstance({
                method: "post",
                url: "/order/handleOrderStatus",
                data: { actionConfirm, actionConfirmed, codeOrder },
            })

            handleSnackBar(response)
        }

        request()
        dispatch(refetch())
    }

    const columns = [
        { field: "code", headerName: "Mã đơn", width: 350 },
        {
            field: "price",
            headerName: "Tổng thanh toán",
            width: 200,
            renderCell: (params) => {
                return formatVND(params.row.total)
            },
        },
        {
            field: "isActive",
            headerName: "Trạng thái",
            width: 180,
            renderCell: (params) => {
                return params.row.status
            },
        },
        {
            field: "action",
            headerName: "Thao tác",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/orders/" + params.row.code}>
                            <ButtonEdit>Chi tiết</ButtonEdit>
                        </Link>

                        <IconButton sx={{ color: "red" }}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </>
                )
            },
        },
        {
            field: "confirm",
            headerName: "Xác nhận nhanh",
            width: 300,
            renderCell: (params) => {
                const buttonConfirm = handleButtonConfirm(params.row.status)

                return buttonConfirm?.action.map((item, index) => {
                    return (
                        <Button
                            key={index}
                            sx={{ marginLeft: "20px" }}
                            onClick={() => handleClick(actionConfirm, item, params.row.code)}
                        >
                            {item}
                        </Button>
                    )
                })
            },
        },
    ]

    return (
        <Box flex={4}>
            <AdminTitle>Danh sách đơn hàng</AdminTitle>

            <ButtonCreateOrder />

            <DataGrid
                rows={products || []}
                disableSelectionOnClick
                columns={columns}
                pageSize={7}
                checkboxSelection
                autoHeight
                autoPageSize
                rowHeight={60}
                hideFooter
                loading={isPending}
            />

            <PaginationCustomize counterPage={sumPages} refetch={refetch()} />
        </Box>
    )
}

const ButtonEdit = ({ children, ...props }) => {
    return (
        <Box
            {...props}
            sx={{
                border: "none",
                borderRadius: "10px",
                padding: "5px 20px",
                backgroundColor: "#3bb077",
                color: "#fff",
                cursor: "pointer",
                marginRight: "20px",

                "&:hover": {
                    backgroundColor: "#2c8157",
                },
            }}
        >
            {children}
        </Box>
    )
}
