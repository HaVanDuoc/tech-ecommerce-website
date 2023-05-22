import "./userList.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FormatFullName, formatVND } from "~/helper/format";
import { ButtonCreate, StackButtons } from "~/admin/Styled";
import { useSnackbar } from "notistack";
import axiosInstance from "~/utils/axiosInstance";

export default function UserList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userDelete, setUserDelete] = useState(null);

  // Fetch list user
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosInstance({
        method: "get",
        url: "/admin/users/",
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      });

      setData(response.data.data);
    };

    fetchUsers();
  }, []);

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (userId, firstName, middleName, lastName) => {
    setOpen(true);
    setUserDelete({
      userId,
      fullName: FormatFullName(firstName, middleName, lastName),
    }); // Transmission userId and fullName for Alert
  };

  const handleAgreeDelete = (userId) => {
    setTimeout(async () => {
      const response = await axiosInstance({
        method: "delete",
        url: `/admin/users/${userId}`,
        headers: { Authorization: localStorage.getItem("access_token") },
      });

      if (response.data.err === 0) {
        setData(data.filter((item) => item.userId !== userId));
        handleClose(); // Close Delete Box
        handleSnackBar(response);
      }

      if (response.data.err === 1) {
        handleClose();
        handleSnackBar(response);
      }
    }, 1500);
  };

  const columns = [
    { field: "userId", headerName: "ID", width: 110 },
    {
      field: "user",
      headerName: "Họ tên",
      width: 250,
      renderCell: (params) => {
        const firstName = params.row.firstName ? params.row.firstName : "";
        const middleName = params.row.middleName ? params.row.middleName : "";
        const lastName = params.row.lastName ? params.row.lastName : "";
        return (
          <div className="userListUser">
            <Avatar
              alt="avatar"
              src={params.row.avatar}
              className="userListImg"
            />
            {firstName + " " + middleName + " " + lastName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        switch (params.row.status) {
          case "active":
            return "Đang hoạt động";

          case "block":
            return "Tạm khóa";

          case "disable":
            return "Khóa vĩnh viễn";

          default:
            return;
        }
      },
    },
    {
      field: "transactionVolume",
      headerName: "Tổng thanh toán",
      width: 200,
      renderCell: (params) => {
        return formatVND(params.row.transactionVolume);
      },
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/user/update/" + params.row.userId}>
              <button className="userListEdit">Chỉnh sửa</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() =>
                handleDelete(
                  params.row.userId,
                  params.row.firstName,
                  params.row.middleName,
                  params.row.lastName
                )
              }
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <StackButtons>
        <ButtonCreate href="/admin/user/newUser" />
      </StackButtons>

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        autoHeight
        hideFooter
      />

      {/* Dialog Delete Box */}
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn chắc chắn muốn xóa?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Người dùng{" "}
              <Typography variant="span" fontWeight={600}>
                {userDelete.fullName}
              </Typography>{" "}
              có ID{" "}
              <Typography variant="span" fontWeight={600}>
                {userDelete.userId}
              </Typography>{" "}
              sẽ được loại bỏ..!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              onClick={() => handleAgreeDelete(userDelete.userId)}
              autoFocus
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
