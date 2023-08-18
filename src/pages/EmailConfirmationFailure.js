import React from 'react';
import Typography from '@mui/material/Typography';

const EmailConfirmationFailure = () => {
  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">Email Confirmation Failed</Typography>
      <Typography paragraph={true}>We're sorry, but the email confirmation failed.</Typography>
    </React.Fragment>
  );
};

export default EmailConfirmationFailure;