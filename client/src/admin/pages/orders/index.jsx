import { Box, Button, Divider, IconButton, Stack } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatVND } from "~/helper/format";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ButtonCreate, StackButtons } from "~/admin/Styled";
import { DataGrid } from "@mui/x-data-grid";
import PaginationCustomize from "~/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { selectorDonHang } from "~/redux/Admin/reducers";
import { AdminAction } from "~/redux/Admin/actions";

export default function Orders() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(
    Number(new URLSearchParams(window.location.search).get("page") || 1)
  );
  const [isPending, setPending] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const reduxOrders = useSelector(selectorDonHang);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      setPending(true);

      const response = await axios({
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
  }, [page, dispatch, reduxOrders]);

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
                Xác nhận đơn hàng
              </Button>
            ) : params.row.status === "Chờ lấy hàng" ? (
              <Button
                sx={{ marginLeft: "20px" }}
                onClick={() => handleClick(params.row.id, params.row.status)}
              >
                Đã lấy hàng
              </Button>
            ) : params.row.status === "Đang giao" ? (
              <Stack
                flexDirection="row"
                justifyContent="start"
                alignItems="center"
              >
                <Button
                  sx={{ marginLeft: "20px" }}
                  onClick={() => handleClick(params.row.id, params.row.status)}
                >
                  Đã giao
                </Button>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ mx: 1, borderColor: "dodgerblue", height: 30 }}
                />
                <Button onClick={() => handleClick(params.row.id, "Trả hàng")}>
                  Trả hàng
                </Button>
              </Stack>
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
        count={reduxOrders.countPage}
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
