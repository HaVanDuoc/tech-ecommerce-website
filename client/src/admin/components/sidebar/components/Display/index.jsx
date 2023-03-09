import { Box } from "@mui/material";
import React from "react";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";

const Display = () => {
  return (
    <Box>
      <h3 className="sidebarTitle">Display</h3>
      <ul className="sidebarList">
        <Link to="/admin/display/banner" className="link">
          <li className="sidebarListItem">
            <ViewCarouselIcon className="sidebarIcon" />
            Banner
          </li>
        </Link>
        <Link to="/admin/display/category" className="link">
          <li className="sidebarListItem">
            <CategoryIcon className="sidebarIcon" />
            Category
          </li>
        </Link>
      </ul>
    </Box>
  );
};

export default Display;
