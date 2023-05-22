import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ButtonCreate, StackButtons } from "~/admin/Styled";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import axiosInstance from "~/utils/axiosInstance";

export default function DisplayCategory() {
  const [data, setData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

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

  // Fetch list category
  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance("/admin/display/category");
      setData(response.data.data);
    };

    fetch();
  }, []);
  //

  const handleDelete = (productId) => {
    setTimeout(async () => {
      const response = await axiosInstance({
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
    { field: "categoryId", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Category",
      width: 300,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {params.row.illustration && (
              <img
                src={params.row.illustration}
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
      field: "link",
      headerName: "Link",
      width: 300,
      renderCell: (params) => {
        return (
          <Link
            href={
              process.env.REACT_APP_PUBLIC_FOLDER + params.row.link || "Trống"
            }
          >
            {params.row.link
              ? process.env.REACT_APP_PUBLIC_FOLDER + params.row.link
              : "Trống"}
          </Link>
        );
      },
    },
    {
      field: "accessTime",
      headerName: "Access Time",
      width: 150,
      renderCell: (params) => {
        return params.row.accessTime || 0;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={
                "/admin/display/category/updateCategory/" +
                params.row.categoryId
              }
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.productId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Box flex={4}>
      <StackButtons>
        <ButtonCreate href="/admin/display/category/newCategory" />
      </StackButtons>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        checkboxSelection
        autoHeight
        autoPageSize
        rowHeight={100}
      />
    </Box>
  );
}
