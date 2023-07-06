import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import StorageIcon from '@mui/icons-material/Storage';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Link } from 'react-router-dom';


const drawerWidth = 240;

export default function SideMenuDrawer() {
  return (
    
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem key="1" component={Link} to="/" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <StorageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Index" />
                </ListItemButton>
              </ListItem>
              <ListItem key="2" component={Link} to="/scrape" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CleaningServicesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Scrape" />
                </ListItemButton>
              </ListItem>
          </List>
          
        </Box>
      </Drawer>
  );
}