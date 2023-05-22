import { refreshPage } from "~/utils";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminAction } from "~/redux/Admin/actions";
import { useDispatch, useSelector } from "react-redux";
import PaginationCustomize from "~/components/Pagination";
import { selectorKhachHang } from "~/redux/Admin/reducers";
import { ButtonCreate, StackButtons } from "~/admin/Styled";
import { formatStatusProduct, formatVND } from "~/helper/format";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axiosInstance from "~/utils/axiosInstance";

export default function ProductList() {
  const [page, setPage] = useState(
    Number(new URLSearchParams(window.location.search).get("page")) || 1
  );
  const [isPending, setPending] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const fetchKhachHang = useSelector(selectorKhachHang);
  const dispatch = useDispatch();

  const token = localStorage.getItem("access_token");

  // Fetch list product
  useEffect(() => {
    // fetch data
    const fetch = async () => {
      setPending(true);

      const response = await axiosInstance({
        method: "post",
        url: "/admin/products/getProducts",
        headers: {
          Authorization: token,
        },
        data: { page },
      });

      dispatch(
        AdminAction(
          "Khách hàng",
          response.data.all,
          page,
          response.data.limit,
          response.data.data
        )
      );

      setPending(false);
    };

    (fetchKhachHang.isFetch && fetchKhachHang.payload[`page-${page}`]) ||
      fetch();
  }, [page, dispatch, fetchKhachHang, token]);

  const handleSnackBar = (res) => {
    if (res.data.err === 0) {
      enqueueSnackbar(res.data.msg, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 4000,
      });
    } else {
      enqueueSnackbar(res.data.msg, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 4000,
      });
    }
  };

  const handleDelete = (productId) => {
    setTimeout(async () => {
      const response = await axiosInstance({
        method: "delete",
        url: `/admin/product/${productId}`,
      });

      if (response.data.err === 0) {
        handleSnackBar(response);
        refreshPage();
      }
    });
  };

  const columns = [
    { field: "productId", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Sản phẩm",
      width: 350,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {params.row.image && (
              <img
                src={JSON.parse(params.row.image)[0].base64}
                alt=""
                style={{ width: "100px" }}
              />
            )}
            {params.row.name}
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Giá",
      width: 160,
      renderCell: (params) => {
        return formatVND(params.row.price);
      },
    },
    { field: "stock", headerName: "Số lượng", width: 150 },
    {
      field: "isActive",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        return formatStatusProduct(params.row.isActive, params.row.stock);
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
            <IconButton
              sx={{ color: "red" }}
              onClick={() => handleDelete(params.row.productId)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box flex={4}>
      <StackButtons>
        <ButtonCreate href="/admin/product/newProduct" />
      </StackButtons>
      <DataGrid
        rows={
          fetchKhachHang.isFetch && fetchKhachHang?.payload[`page-${page}`]
            ? fetchKhachHang?.payload[`page-${page}`]
            : []
        }
        disableSelectionOnClick
        columns={columns}
        pageSize={3}
        checkboxSelection
        autoHeight
        autoPageSize
        rowHeight={150}
        loading={isPending}
        hideFooter
      />

      <PaginationCustomize
        page={page}
        setPage={setPage}
        countProducts={fetchKhachHang.countPage}
        limit={fetchKhachHang.limit}
      />
    </Box>
  );
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
  );
};
