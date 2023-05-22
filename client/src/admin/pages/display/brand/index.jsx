import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ButtonCreate, StackButtons } from "~/admin/Styled";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import axiosInstance from "~/utils/axiosInstance";

export default function DisplayBrand() {
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

  // Fetch list product
  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance("/admin/display/brand");
      setData(response.data.data);
    };

    fetch();
  }, []);
  //

  const handleDelete = (brandId) => {
    setTimeout(async () => {
      const response = await axiosInstance({
        method: "delete",
        url: `/admin/product/${brandId}`,
      });

      if (response.data.err === 0) {
        handleSnackBar(response);
        setData(data.filter((item) => item.brandId !== brandId));
      }
    });
  };

  const columns = [
    { field: "brandId", headerName: "ID", width: 100 },
    {
      field: "logo",
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
            {params.row.logo && (
              <img src={params.row.logo} alt="" style={{ width: "100px" }} />
            )}
          </Box>
        );
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
        );
      },
    },
  ];

  return (
    <Box flex={4}>
      <StackButtons>
        <ButtonCreate href="/admin/display/brand/newBrand" />
      </StackButtons>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        autoHeight
        autoPageSize
        rowHeight={50}
      />
    </Box>
  );
}
