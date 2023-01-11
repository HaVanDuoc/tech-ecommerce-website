import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchMainHeader from "../MainHeader/SearchMainHeader";
import { NavHeaderData } from "../NavHeader/Data";

const DrawerHeader = () => {
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: "center", backgroundColor: "#f9f9f9" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 20px 20px 20px",
        }}
      >
        <SearchMainHeader />
      </Box>
      <Divider />
      <List onClick={handleToggleDrawer}>
        {NavHeaderData.map((item, index) => (
          <Box key={index}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "left" }}>
                <ListItemText
                  primary={item.name}
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "500",

                    "& :hover": {
                      color: "var(--hover-black)",
                    },
                  }}
                />
                {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
              </ListItemButton>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        onClick={handleToggleDrawer}
        sx={{ display: { md: "none", xs: "flex" } }}
      >
        <MenuIcon />
      </IconButton>
      <Box>
        <Drawer open={open} onClose={handleToggleDrawer}>
          {drawer}
        </Drawer>
      </Box>
    </React.Fragment>
  );
};

export default DrawerHeader;
