import "./userList.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { FetchUserList } from "~/helper/fetch";

export default function UserList() {
  const [data, setData] = useState([]);

  // Fetch list user
  const response = FetchUserList();
  React.useEffect(() => {
    setData(response);
  }, [response]);
  //

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "userId", headerName: "ID", width: 110 },
    {
      field: "user",
      headerName: "Name",
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
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transactionVolume",
      headerName: "Transaction Volume",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="productListOption">
        <Link to="/admin/newUser">
          <button className="productAddButton">Thêm</button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        autoHeight
      />
    </div>
  );
}
