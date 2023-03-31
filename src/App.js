import { Box, Link, Toolbar, Typography } from '@mui/material';
import './App.css';
// import SideMenuDrawer from './components/SideMenu';
// import TopAppBar from './components/TopMenu';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Search from './pages/Search';
import Scrape from './pages/Scrape';
import ResponsiveDrawer from './components/ResponsiveDrawer'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AxiosInterceptor } from './axios';
import SignOut from './pages/SignOut';

function App() {

  return (
    
    <div className="App">
    <Box sx={{display: "flex"}}>
        <ResponsiveDrawer />
        <Box component="main" sx={{flexGrow: 1, p:3}}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/search" element={<Search />} />
          <Route path="/scrape" element={<Scrape />} />
        </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
