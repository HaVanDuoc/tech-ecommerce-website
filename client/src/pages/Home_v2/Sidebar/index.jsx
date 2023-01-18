import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";

const categories = [
  { name: "hot", icon: <InboxIcon />, href: "#", hot: true },
  { name: "hot", icon: <InboxIcon />, href: "#", hot: true },
  { name: "hot", icon: <InboxIcon />, href: "#", hot: true },
  { name: "hot", icon: <InboxIcon />, href: "#", hot: true },
  { name: "hot", icon: <InboxIcon />, href: "#", hot: true },
  { name: "Điện thoại", icon: <InboxIcon />, href: "#", hot: false },
  { name: "Điện thoại", icon: <InboxIcon />, href: "#", hot: false },
  { name: "Điện thoại", icon: <InboxIcon />, href: "#", hot: false },
  { name: "Điện thoại", icon: <InboxIcon />, href: "#", hot: false },
  { name: "Điện thoại", icon: <InboxIcon />, href: "#", hot: false },
];

const SidebarWrapper = styled(Box)(() => ({
  width: "100%",
  minHeight: "200px",
  position: "sticky",
  top: "0",
  overflow: "auto",
}));

const Title = ({ children }) => {
  return <Typography sx={{ fontWeight: "500", px: 1 }}>{children}</Typography>;
};

const SidebarBoxWrapper = styled(Box)(() => ({
  backgroundColor: "#fff",
  borderRadius: "var(--border-radius)",
  padding: "10px",
  marginBottom: "15px",
  width: "100%",
}));

const SidebarBox = ({ hot }) => {
  return (
    <SidebarBoxWrapper>
      <Title>{hot ? "Nổi bật" : "Danh mục"}</Title>
      <List>
        {categories
          .filter(
            hot
              ? (categories) => {
                  return categories.hot === true;
                }
              : (categories) => {
                  return categories.hot === false;
                }
          )
          .map((item, index) => (
            <ListItemButton href={item.href} key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
      </List>
    </SidebarBoxWrapper>
  );
};

const Sidebar = () => {
  return (
    <SidebarWrapper>
      {/* <SidebarFixed> */}
      <SidebarBox hot />
      <SidebarBox />
      {/* </SidebarFixed> */}
    </SidebarWrapper>
  );
};

export default Sidebar;
