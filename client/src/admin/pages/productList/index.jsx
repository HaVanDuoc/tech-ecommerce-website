import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FetchProductList } from "~/helper/fetch";
import { formatVND } from "~/helper/format";
import { ButtonCreate, StackButtons } from "~/admin/Styled";
import { Box } from "@mui/material";

export default function ProductList() {
  const [data, setData] = useState(productRows);

  // Fetch list product
  const response = FetchProductList();
  React.useEffect(() => {
    setData(response);
  }, [response]);
  //

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "productId", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Product",
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
            {params.row.image && (
              <img src={params.row.image} alt="" style={{ width: "100px" }} />
            )}
            {params.row.name}
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
      renderCell: (params) => {
        return formatVND(params.row.price);
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "isActive",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return params.row.isActive === "0"
          ? params.row.stock === "0"
            ? "Hết hàng"
            : "Còn hàng"
          : "Không kinh doanh";
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
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
