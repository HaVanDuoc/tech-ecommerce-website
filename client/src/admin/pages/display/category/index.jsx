import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { ButtonCreate, StackButtons } from "~/admin/Styled"
import { Box } from "@mui/material"
import { useSnackbar } from "notistack"
import axiosInstance from "~/utils/axiosInstance"
import { useDispatch, useSelector } from "react-redux"
import { requestBrands, requestCategories } from "~/api"
import { selectorCategories } from "~/redux/categorySlice"
import { selectorBrands } from "~/redux/brandSlice"

export default function DisplayCategory() {
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const fetchCategories = useSelector(selectorCategories)
    const fetchBrands = useSelector(selectorBrands)
    const categories = fetchCategories?.payload
    const brands = fetchBrands?.payload

    const { enqueueSnackbar } = useSnackbar()

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

    useEffect(() => {
        if (!categories) requestCategories(dispatch)
        if (!brands) requestBrands(dispatch, {})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = (productId) => {
        setTimeout(async () => {
            const response = await axiosInstance({
                method: "delete",
                url: `/admin/product/${productId}`,
            })

            if (response.data.err === 0) {
                handleSnackBar(response)
                setData(data.filter((item) => item.productId !== productId))
            }
        })
    }

    const columns = [
        { field: "categoryId", headerName: "ID", width: 100 },
        {
            field: "name",
            headerName: "Danh mục",
            width: 300,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {params.row.image && <img src={params.row.image[0].path} alt="" style={{ width: "100px" }} />}
                        {params.row.name}
                    </Box>
                )
            },
        },
        {
            field: "view",
            headerName: "Lượt truy cập",
            width: 150,
            renderCell: (params) => {
                return params.row.view || 0
            },
        },
        {
            field: "alias",
            headerName: "Địa chỉ truy cập",
            width: 300,
            renderCell: (params) => {
                return (
                    <Link to={`/${params.row.alias}` || "Trống"}>
                        {params.row.alias ? `${process.env.REACT_APP_PUBLIC_FOLDER}/${params.row.alias}` : "Trống"}
                    </Link>
                )
            },
        },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/display/category/updateCategory/" + params.row.categoryId}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutlineIcon
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.productId)}
                        />
                    </>
                )
            },
        },
    ]

    return (
        <Box flex={4}>
            <StackButtons>
                <ButtonCreate href="/admin/display/category/newCategory" />
            </StackButtons>
            <DataGrid
                rows={categories || []}
                disableSelectionOnClick
                columns={columns}
                pageSize={5}
                checkboxSelection
                autoHeight
                autoPageSize
                rowHeight={100}
            />
        </Box>
    )
}
