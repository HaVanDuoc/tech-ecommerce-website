import { Box, List, ListItemButton, ListItemIcon, ListItemText, Stack, styled, Typography } from "@mui/material";
import React from "react";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const SidebarHomeWrapper = styled(Box)(() => ({}));

const SidebarBox = () => {
  // Title
  const Title = styled(Typography)(() => ({}));

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
    </Box>
  );
};

const SidebarHome = () => {
  return (
    <SidebarHomeWrapper>
      <SidebarBox></SidebarBox>
    </SidebarHomeWrapper>
  );
};

export default SidebarHome;
