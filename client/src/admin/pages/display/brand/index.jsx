import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import React, { useEffect } from "react"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { ButtonCreate, StackButtons } from "~/admin/Styled"
import { Box } from "@mui/material"
import { requestBrands } from "~/api"
import { useDispatch, useSelector } from "react-redux"
import { selectorBrands } from "~/redux/brandSlice"

export default function DisplayBrand() {
    const dispatch = useDispatch()
    const category = new URLSearchParams(window.location.search).get("category")
    const brands = useSelector(selectorBrands)
    const payload = brands?.payload && brands.payload[`${category}`]

    useEffect(() => {
        requestBrands(dispatch, { category })
    }, [dispatch, category])

    const handleDelete = (brandId) => {
        setTimeout(async () => {
            // const response = await deleteBrand(brandId)
            // if (response.data.err === 0) {
            //     handleSnackBar(response)
            //     setData(data.filter((item) => item.brandId !== brandId))
            // }
        })
    }

    const columns = [
        { field: "brandId", headerName: "ID", width: 100 },
        {
            field: "image",
            headerName: "Logo",
            width: 250,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {params.row.image && <img src={params.row.image[0].path} alt="" style={{ width: "100px" }} />}
                    </Box>
                )
            },
        },
        {
            field: "name",
            headerName: "Thương hiệu",
            width: 250,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {params.row.name}
                    </Box>
                )
            },
        },
        {
            field: "link",
            headerName: "Link",
            width: 300,
            renderCell: (params) => {
                return (
                    <Link href={process.env.REACT_APP_PUBLIC_FOLDER + params.row.link || "Trống"}>
                        {params.row.link ? process.env.REACT_APP_PUBLIC_FOLDER + params.row.link : "Trống"}
                    </Link>
                )
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/display/brand/update/" + params.row.brandId}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutlineIcon
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.brandId)}
                        />
                    </>
                )
            },
        },
    ]

    return (
        <Box flex={4}>
            <StackButtons>
                <ButtonCreate href="/admin/display/brand/newBrand" />
            </StackButtons>
            <DataGrid
                rows={payload || []}
                disableSelectionOnClick
                columns={columns}
                pageSize={10}
                checkboxSelection
                autoHeight
                autoPageSize
                rowHeight={50}
            />
        </Box>
    )
}
