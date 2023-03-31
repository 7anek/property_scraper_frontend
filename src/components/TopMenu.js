import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {useLocation } from 'react-router-dom';

export default function TopAppBar(props) {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      if(localStorage.getItem('jwt_access_token')){
        setIsAuthenticated(true);
      }
    }, [isAuthenticated]);



    if(isAuthenticated){
      authenticationLinks = <Typography variant="h6" noWrap component="div" ml={6}>
      {localStorage.getItem('username')} <Link href="/signout">Sign out</Link>
    </Typography>
    }else{
      authenticationLinks = <Typography variant="h6" noWrap component="div" ml={6}>
      <Link href="/signout">Sign up</Link><Link href="/signout">Sign in</Link>
      </Typography>
    }

    return (       
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, mb: "64px"}}>
        <Toolbar >
          <Typography variant="h6" noWrap component="div">
            Properties Scraper
          </Typography>
          <Typography variant="h6" noWrap component="div" ml={6}>
            {location.pathname}
          </Typography>
          {authenticationLinks}   
        </Toolbar>
      </AppBar>   
    );
}