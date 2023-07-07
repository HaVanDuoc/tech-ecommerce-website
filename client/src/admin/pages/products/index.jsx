import { Link } from "react-router-dom"
import { useSnackbar } from "notistack"
import { DataGrid } from "@mui/x-data-grid"
import { Box, IconButton } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PaginationCustomize from "~/components/Pagination"
import { AdminTitle, ButtonCreate, StackButtons } from "~/admin/Styled"
import { formatStatusProduct, formatVND } from "~/helper/format"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { endSetProduct, refetchProduct, selectorProductsAdmin, setProducts, startSetProduct } from "~/redux/adminSlice"
import refreshPage from "~/utils/refreshPage"
import axiosInstance from "~/api"

export default function ProductList() {
    const page = Number(new URLSearchParams(window.location.search).get("page")) || 1
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()

    const products = useSelector(selectorProductsAdmin)

    useEffect(() => {
        const fetch = async () => {
            dispatch(startSetProduct())

            const response = await axiosInstance("post", "/product/admin/getProducts", { page })

            dispatch(
                setProducts({
                    countProduct: response.data.all,
                    currentPage: page,
                    counterPage: response.data.counterPage,
                    limit: response.data.limit,
                    payload: response.data.images,
                })
            )

            dispatch(endSetProduct())
        }

        if (!products.payload[`page-${page}`]) fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page, products.refetch])

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

    const handleDelete = (productId) => {
        setTimeout(async () => {
            const response = await axiosInstance({
                method: "delete",
                url: `/admin/product/${productId}`,
            })

            if (response.data.err === 0) {
                handleSnackBar(response)
                refreshPage()
            }
        })
    }

    const columns = [
        { field: "productId", headerName: "ID", width: 100 },
        {
            field: "name",
            headerName: "Sản phẩm",
            width: 350,
            renderCell: (params) => {
                return (
                    <Box sx={styles1}>
                        {params.row.files && (
                            <img
                                src={params.row.files[0].path}
                                alt=""
                                style={{ width: "100px", marginRight: "10px" }}
                            />
                        )}
                        {params.row.name}
                    </Box>
                )
            },
        },
        {
            field: "price",
            headerName: "Giá",
            width: 160,
            renderCell: (params) => {
                return formatVND(params.row.price)
            },
        },
        { field: "stock", headerName: "Số lượng", width: 150 },
        {
            field: "isActive",
            headerName: "Trạng thái",
            width: 150,
            renderCell: (params) => {
                return formatStatusProduct(params.row.isActive, params.row.stock)
            },
        },
        {
            field: "action",
            headerName: "Thao tác",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/product/update/" + params.row.productId}>
                            <ButtonEdit>Chỉnh sửa</ButtonEdit>
                        </Link>
                        <IconButton sx={{ color: "red" }} onClick={() => handleDelete(params.row.productId)}>
                            <DeleteOutlineIcon />
                        </IconButton>
                    </>
                )
            },
        },
    ]

    return (
        <Box flex={4}>
            <AdminTitle>Danh sách sản phẩm</AdminTitle>

            <StackButtons>
                <ButtonCreate to="/admin/product/newProduct">Tạo mới</ButtonCreate>
            </StackButtons>

            <DataGrid
                rows={products.isFetch && products?.payload[`page-${page}`] ? products?.payload[`page-${page}`] : []}
                disableSelectionOnClick
                columns={columns}
                pageSize={3}
                checkboxSelection
                autoHeight
                autoPageSize
                rowHeight={145}
                loading={products.isPending}
                hideFooter
            />

            <PaginationCustomize counterPage={products.counterPage} refetch={refetchProduct()} />
        </Box>
    )
}

const ButtonEdit = ({ children, ...props }) => {
    const style = {
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
    }

    return (
        <Box {...props} sx={style}>
            {children}
        </Box>
    )
}

const styles1 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}
