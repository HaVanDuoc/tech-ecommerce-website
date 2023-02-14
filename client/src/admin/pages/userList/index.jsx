import "./userList.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@mui/x-data-grid";
import { FetchUserList } from "./fetchData";

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
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        const firstName = params.row.firstName ? params.row.firstName : "";
        const lastName = params.row.lastName ? params.row.lastName : "";
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {firstName + " " + lastName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
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
