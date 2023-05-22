import { Box, Button, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatVND } from "~/helper/format";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PaginationCustomize from "~/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { selectorDonHang } from "~/redux/Admin/reducers";
import { AdminAction } from "~/redux/Admin/actions";
import { DataGrid } from "@mui/x-data-grid";
import { actionConfirm, handleButtonConfirm } from "./components/handleConfirm";
import { refreshPage } from "~/utils";
import ButtonCreateOrder from "./components/ButtonCreateOrder";
import axiosInstance from "~/utils/axiosInstance";

export default function Orders() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(
    Number(new URLSearchParams(window.location.search).get("page") || 1)
  );
  const [isPending, setPending] = useState(false);
  const [reset, setReset] = useState(true);
  const reduxOrders = useSelector(selectorDonHang);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      setPending(true);

      const response = await axiosInstance({
        method: "post",
        url: "/admin/orders/getOrders",
        data: { page },
      });

      dispatch(
        AdminAction(
          "Đơn hàng",
          response.data.all,
          page,
          response.data.limit,
          response.data.data
        )
      );

      setPending(false);
    };

    (reduxOrders.isFetch && reduxOrders.payload[`page-${page}`]) || fetch();
  }, [page, dispatch, reduxOrders, reset]);

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
        setData(data.filter((item) => item.productId !== productId));
      }
    });
  };

  const handleClick = (actionConfirm, actionConfirmed, codeOrder) => {
    const request = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/admin/orders/handleOrderStatus",
        data: { actionConfirm, actionConfirmed, codeOrder },
      });

      handleSnackBar(response);
    };

    request();

    setReset(!reset);

    refreshPage();
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
            <Link to={"/admin/orders/" + params.row.code}>
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
      headerName: "Xác nhận nhanh",
      width: 300,
      renderCell: (params) => {
        const buttonConfirm = handleButtonConfirm(params.row.status);

        return buttonConfirm?.action.map((item, index) => {
          return (
            <Button
              key={index}
              sx={{ marginLeft: "20px" }}
              onClick={() => handleClick(actionConfirm, item, params.row.code)}
            >
              {item}
            </Button>
          );
        });
      },
    },
  ];

  return (
    <Box flex={4}>
      <ButtonCreateOrder />

      <DataGrid
        rows={
          reduxOrders.isFetch && reduxOrders?.payload[`page-${page}`]
            ? reduxOrders?.payload[`page-${page}`]
            : []
        }
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        autoHeight
        autoPageSize
        rowHeight={60}
        hideFooter
        loading={isPending}
      />

      <PaginationCustomize
        page={page}
        setPage={setPage}
        countProducts={reduxOrders.countPage}
        limit={reduxOrders.limit}
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
