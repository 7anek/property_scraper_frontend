import React from 'react';
import Typography from '@mui/material/Typography';
import {
    useParams,
  } from "react-router-dom";

function EmailConfirmationSuccess() {

    const { email } = useParams();
    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">Email Confirmed</Typography>
            <Typography paragraph={true}>Your email {email} has been successfully confirmed!</Typography>
        </React.Fragment>
  );
};

export default EmailConfirmationSuccess;