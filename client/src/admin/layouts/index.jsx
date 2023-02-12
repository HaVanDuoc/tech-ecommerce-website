import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import '../App.css'

const AdminLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Topbar />
      <div className="container">
        <Sidebar />
        {children}
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
