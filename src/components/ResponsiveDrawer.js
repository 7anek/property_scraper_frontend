import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import StorageIcon from '@mui/icons-material/Storage';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Link } from 'react-router-dom';
import {useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Grid } from '@mui/material';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window2 } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("ResponsiveDrawer");
    if(localStorage.getItem('jwt_access_token')){
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [isAuthenticated,setIsAuthenticated]);

  const isMobile = width <= 768;
  const isMobileS = width <= 375;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  // if(isAuthenticated){
  if(localStorage.getItem('jwt_access_token')){
      var authenticationLinks = <Typography variant="h6" noWrap component="div" ml={6}>
    {localStorage.getItem('username')} <Button color="inherit" href="/signout" >Sign out</Button>
  </Typography>
  }else{
    var authenticationLinks = <Typography variant="h6" noWrap component="div" ml={6}>
    <Button href="/signup" color="inherit">Sign up</Button><Button href="/signin" color="inherit">Sign in</Button>
    </Typography>
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
          <ListItem key="1" component={Link} to="/" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText disableTypography={true}  primary={<Typography variant="h6" color="grey" sx={{fontWeight:'505'}}>Index</Typography>}/>
            </ListItemButton>
          </ListItem>
            {/* <ListItem key="2" component={Link} to="/search" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText disableTypography={true} primary={<Typography variant="h6" color="grey" sx={{fontWeight:'505'}}>Search</Typography>} />
              </ListItemButton>
            </ListItem> */}
          <ListItem key="3" component={Link} to="/scrape" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CleaningServicesIcon />
              </ListItemIcon>
              <ListItemText disableTypography={true} primary={<Typography variant="h6" color="grey" sx={{fontWeight:'505'}}>Scrape</Typography>} />
            </ListItemButton>
          </ListItem>
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container = window2 !== undefined ? () => window2().document.body : undefined;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {!isMobile && <Typography variant="h6" noWrap component="div">
          Properties Scraper
          </Typography>}
          {!isMobileS && <Typography variant="h6" noWrap component="div" ml={6}  sx={{ flexGrow: 1 }}>
            {location.pathname.substring(1)}
          </Typography>}
          {authenticationLinks}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </React.Fragment>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window2: PropTypes.func,
};

export default ResponsiveDrawer;