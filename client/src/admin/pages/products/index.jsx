import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { formatStatusProduct, formatVND } from "~/helper/format";
import { ButtonCreate, StackButtons } from "~/admin/Styled";
import { Box, IconButton } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function ProductList() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch list product
  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "post",
        url: "/admin/products/getProducts",
        data: { offset },
      });
      setData(response.data.data);
    };

    fetch();
  }, [offset]);

  // useEffect(() => {
  //   document
  //     .querySelector(`button[aria-label="Go to next page"]`)
  //     .addEventListener("click", () => {
  //       setOffset(offset + 5);
  //     });
  // }, []);

  // console.log("offset", offset);

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
      const response = await axios({
        method: "delete",
        url: `/admin/product/${productId}`,
      });

      if (response.data.err === 0) {
        handleSnackBar(response);
        setData(data.filter((item) => item.productId !== productId));
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
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={3}
        checkboxSelection
        autoHeight
        autoPageSize
        rowHeight={150}
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
