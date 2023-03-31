import { Box, CssBaseline, Link, Toolbar, Typography } from '@mui/material';
import './App.css';
import SideMenuDrawer from './components/SideMenu';
import TopAppBar from './components/TopMenu';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Search from './pages/Search';
import Scrape from './pages/Scrape';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  return (
    <div className="App">
    <Box sx={{display: "flex"}}>
    <BrowserRouter>
        <CssBaseline />
        <TopAppBar />
        <CssBaseline />
        <SideMenuDrawer />
        <Box component="main" sx={{flexGrow: 1, p:3}}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/scrape" element={<Scrape />} />
        </Routes>
        <Copyright sx={{ mt: 5 }} />
        </Box>
      </BrowserRouter>
        
      </Box>
    </div>
  );
}

export default App;
