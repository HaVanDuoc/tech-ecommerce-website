import "./user.css";
import React from "react";
import { Link } from "react-router-dom";
import UserShow from "./components/UserShow";
import UserUpdate from "./components/UserUpdate";

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Cập nhật thông tin</h1>
        <Link to="/admin/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <UserShow />
        <UserUpdate />
      </div>
    </div>
  );
}
