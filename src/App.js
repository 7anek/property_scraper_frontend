import { Box, Link, Toolbar, Typography } from '@mui/material';
import './App.css';
// import SideMenuDrawer from './components/SideMenu';
// import TopAppBar from './components/TopMenu';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route, useParams} from "react-router-dom"
import Search from './pages/Search';
import Scrape from './pages/Scrape';
import ResponsiveDrawer from './components/ResponsiveDrawer'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AxiosInterceptor } from './axios';
import SignOut from './pages/SignOut';
import EmailConfirmationSuccess from './pages/EmailConfirmationSuccess';
import EmailConfirmationFailure from './pages/EmailConfirmationFailure';

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
          <Route path="/scrape" element={<Scrape />} />
          <Route path="/email-confirmation-success/:email" element={<EmailConfirmationSuccess />} />
          {/* <Route exact path="/email-confirmation-success/:email" render={(props) => <EmailConfirmationSuccess {...props} /> } /> */}
          <Route path="/email-confirmation-failure" element={<EmailConfirmationFailure />} />
        </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
