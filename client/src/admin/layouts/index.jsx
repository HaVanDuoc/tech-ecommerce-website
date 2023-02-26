import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import "../Admin.css";
import { Box } from "@mui/material";

const AdminLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Box flex={4}>{children}</Box>
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
