import { Box, Button, Divider, IconButton } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatVND } from "~/helper/format";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ButtonCreate, StackButtons } from "~/admin/Styled";
import { DataGrid } from "@mui/x-data-grid";

export default function Orders() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "post",
        url: "/admin/orders/getOrders",
        data: { pagination },
      });

      setData(response.data.data);
    };

    fetch();
  }, [pagination]);

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

  const handleClick = (order_id, order_status) => {
    const request = async () => {
      await axios({
        method: "post",
        url: "/admin/orders/handleOrderStatus",
        data: { order_id, order_status },
      });
    };

    request();
  };

  const columns = [
    { field: "code", headerName: "Mã đơn", width: 350 },
    {
      field: "price",
      headerName: "Tổng thanh toán",
      width: 200,
      renderCell: (params) => {
        return formatVND(params.row.total);
      },
    },
    {
      field: "isActive",
      headerName: "Trạng thái",
      width: 180,
      renderCell: (params) => {
        return params.row.status;
      },
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/product/update/" + params.row.id}>
              <ButtonEdit>Chi tiết</ButtonEdit>
            </Link>

            <IconButton
              sx={{ color: "red" }}
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "confirm",
      headerName: "Xác nhận",
      width: 300,
      renderCell: (params) => {
        return (
          <Fragment>
            {params.row?.status && params.row.status === "Chờ xác nhận" ? (
              <Button
                sx={{ marginLeft: "20px" }}
                onClick={() => handleClick(params.row.id, params.row.status)}
              >
                Xác nhận
              </Button>
            ) : params.row.status === "Chờ lấy hàng" ? (
              <Button
                sx={{ marginLeft: "20px" }}
                onClick={() => handleClick(params.row.id, params.row.status)}
              >
                Đã lấy hàng
              </Button>
            ) : params.row.status === "Đang giao" ? (
              <Fragment>
                <Button
                  sx={{ marginLeft: "20px" }}
                  onClick={() => handleClick(params.row.id, params.row.status)}
                >
                  Đã giao
                </Button>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Button
                  sx={{ marginLeft: "20px" }}
                  onClick={() => handleClick(params.row.id, "Trả hàng")}
                >
                  Trả hàng
                </Button>
              </Fragment>
            ) : params.row.status === "Đã giao" ? (
              <Button sx={{ marginLeft: "20px" }}>Xem đánh giá</Button>
            ) : params.row.status === "Trả hàng" ? (
              <Button
                sx={{ marginLeft: "20px" }}
                onClick={() => handleClick(params.row.id, params.row.status)}
              >
                Mua lại
              </Button>
            ) : params.row.status === "Đã hủy" ? (
              <Button
                sx={{ marginLeft: "20px" }}
                onClick={() => handleClick(params.row.id, params.row.status)}
              >
                Mua lại
              </Button>
            ) : (
              <Fragment />
            )}
          </Fragment>
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
        pageSize={8}
        checkboxSelection
        autoHeight
        autoPageSize
        rowHeight={60}
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
