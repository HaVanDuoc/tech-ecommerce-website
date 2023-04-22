import { Box } from "@mui/material";
import React from "react";
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AssistantPhotoOutlinedIcon from "@mui/icons-material/AssistantPhotoOutlined";
import { Link } from "react-router-dom";

const Display = () => {
  return (
    <Box>
      <h3 className="sidebarTitle">Hiển thị</h3>
      <ul className="sidebarList">
        <Link to="/admin/display/banner" className="link">
          <li className="sidebarListItem">
            <ViewCarouselOutlinedIcon className="sidebarIcon" />
            Banner
          </li>
        </Link>
        <Link to="/admin/display/category" className="link">
          <li className="sidebarListItem">
            <CategoryOutlinedIcon className="sidebarIcon" />
            Danh mục
          </li>
        </Link>
        <Link to="/admin/display/brand" className="link">
          <li className="sidebarListItem">
            <AssistantPhotoOutlinedIcon className="sidebarIcon" />
            Thương hiệu
          </li>
        </Link>
      </ul>
    </Box>
  );
};

export default Display;
