import { Fragment } from "react";
import "../sidebar.css";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import { Collapse, List, ListItemText } from "@mui/material";
// import React, { Fragment, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FetchListTables } from "~/helper/fetch";
// import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
// import SdStorageOutlinedIcon from "@mui/icons-material/SdStorageOutlined";

const DbManagement = () => {
  // const [tables, setTables] = useState(null);
  // const [open, setOpen] = useState(false);

  // Fetch list tables
  // const response = FetchListTables();
  // useEffect(() => {
  //   setTables(response);
  // }, [response]);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return (
    <Fragment>
      {/* <h3 className="sidebarTitle">Cơ sở dữ liệu</h3>
      <List className="sidebarList">
        <Link to="/admin/database" className="link">
          <li onClick={handleClick} className="sidebarListItem">
            <SdStorageOutlinedIcon fontSize="small" />
            <ListItemText primary="Tech" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </li>
        </Link>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ "& li": { marginLeft: 3 } }}
          >
            {Array.isArray(tables)
              ? tables.map((item, index) => (
                  <Link
                    to={`/admin/database/${item.Tables_in_tech}`}
                    className="link"
                    key={index}
                  >
                    <li sx={{ pl: 4 }} className="sidebarListItem">
                      <SubdirectoryArrowRightIcon />
                      <ListItemText primary={item.Tables_in_tech} />
                    </li>
                  </Link>
                ))
              : null}
          </List>
        </Collapse>
      </List> */}
    </Fragment>
  );
};

export default DbManagement;
