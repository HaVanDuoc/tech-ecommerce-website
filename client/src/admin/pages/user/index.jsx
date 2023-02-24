import "./user.css";
import React from "react";
import { Link, useParams } from "react-router-dom";
import UserShow from "./components/UserShow";
import UserUpdate from "./components/UserUpdate";
import { FetchUser } from "~/helper/fetch";

export default function User() {
  const [user, setUser] = React.useState({});

  // Lấy UID từ url hiện tại
  const userId = useParams().userId;

  // Fetch thông tin user
  const response = FetchUser(userId);
  React.useEffect(() => {
    setUser(response);
  }, [response]);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Cập nhật thông tin</h1>
        <Link to="/admin/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <UserShow fetch={user} />
        <UserUpdate fetch={user} />
      </div>
    </div>
  );
}
