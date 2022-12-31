import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";

const productList = ["Điện thoại", "Tablet", "Laptop", "PC"];

const ShowMenu = styled(Box)(({ theme }) => ({
  backgroundColor: "red",
  width: "100vw",
}));

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpenNavBar = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseNavBar = (e) => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton
        id="menu-navbar-button"
        aria-controls={open ? "menu-navbar" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="inherit"
        onClick={handleOpenNavBar}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-navbar"
        aria-labelledby="menu-navbar-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseNavBar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          top: "50px"
        }}
      >
        <Paper sx={{ minWidth: "100vw", backgroundColor: "red" }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘X
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘C
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘V
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Web Clipboard</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </Box>

    // <Box>
    //   <IconButton>
    //     <MenuIcon />
    //   </IconButton>
    //   <ShowMenu sx={{ display: { xs: "flex", md: "none" } }}>asdasd</ShowMenu>
    // </Box>
  );
};

export default NavMenu;
